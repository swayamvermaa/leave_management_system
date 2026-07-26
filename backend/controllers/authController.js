import User from "../models/User.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

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
