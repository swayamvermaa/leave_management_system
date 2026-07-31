import User from "../models/User.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import transporter from "../config/mail.js";
import crypto from "crypto";
import otpGenerator from "otp-generator";


// Register User
export const registerUser = async (req, res) => {
  try {

      const {
      name,
      email,
      phone,
      password,
      role,
      enrollmentNumber,
      course,
      department,
      year,
      semester,
      section,
      mentorYear,
      mentorSection,
      mentorDepartment,
      mentorSemester,
    } = req.body;


    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Password are required.",
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address.",
      });
    }


    // Validate phone number
    if (!phone || !/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be exactly 10 digits.",
      });
    }

    // Validate enrollment number for student
    if (role === "student") {
      if (
        !enrollmentNumber ||
        !/^\d{10}$/.test(enrollmentNumber)
      ) {
        return res.status(400).json({
          success: false,
          message: "Enrollment number must be exactly 10 digits.",
        });
      }
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || "student",
      enrollmentNumber,
      course,
      department,
      year,
      semester,
      section,
      mentorYear,
      mentorSection,
      mentorDepartment,
      mentorSemester,
      isHOD: role === "hod",
    });

    // Don't send password back
    const { password: _, ...userData } = user.toObject();

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: userData,
    });

  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const checkUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        role: user.role,
      },
    });

  } catch (error) {
    console.log("Check User Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required.",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Remove password from response
    const { password: _, ...userData } = user.toObject();

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      data: userData,
    });

  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    user.resetOTP = otp;
    user.resetOTPExpire = Date.now() + 2 * 60 * 1000;

    await user.save();

    await transporter.sendMail({
      from: process.env.BREVO_SENDER,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <h2>Campus Duty Leave Management</h2>
        <h3>Your OTP is:</h3>
        <h1>${otp}</h1>
        <p>This OTP is valid for only 5 minutes.</p>
      `,
    });

    res.json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

export const resetPassword = async (req, res) => {
  try {

    const { email, otp, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.resetOTPExpire < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please resend OTP.",
      });

    }

    // OTP match
    if (user.resetOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // OTP expiry
    if (new Date(user.resetOTPExpire) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    // Password Hash
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    // OTP Clear
    user.resetOTP = null;
    user.resetOTPExpire = null;

    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

export const changePassword = async (req, res) => {
  try {

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields.",
      });
    }

    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect.",
      });
    }

    const samePassword = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (samePassword) {
      return res.status(400).json({
        success: false,
        message:
          "New password cannot be same as old password.",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully.",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
// import User from "../models/User.js";
import Leave from "../models/Leave.js";

// Dashboard Statistics
export const getDashboardStats = async (req, res) => {
  try {
    const students = await User.countDocuments({
      role: "student",
    });

    const mentors = await User.countDocuments({
      role: "mentor",
    });

    const organizers = await User.countDocuments({
      role: "organizer",
    });

    const hods = await User.countDocuments({
      role: "hod",
    });

    const leaves = await Leave.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        students,
        mentors,
        organizers,
        hods,
        leaves,
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const checkOldPassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    );

    res.json({
      success: isMatch,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
    });

  }
};