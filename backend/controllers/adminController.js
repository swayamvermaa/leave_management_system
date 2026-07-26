import User from "../models/User.js";
import Leave from "../models/Leave.js";
import admin from "../config/firebaseAdmin.js";

// Dashboard Statistics
export const getDashboardStats = async (req, res) => {
  try {
    const students = await User.countDocuments({ role: "student" });
    const mentors = await User.countDocuments({ role: "mentor" });
    const organizers = await User.countDocuments({ role: "organizer" });
    const hods = await User.countDocuments({ role: "hod" });
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

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

import bcrypt from "bcryptjs";

// Create User
export const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      role,
      enrollmentNumber,
      course,
      department,
      year,
      semester,
      section,
      mentorCourse,
      mentorDepartment,
      mentorYear,
      mentorSemester,
      mentorSection,
    } = req.body;


    if (!phone || !/^\d{10}$/.test(phone)) {
        return res.status(400).json({
          success: false,
          message: "Phone number must be exactly 10 digits.",
        });
      }

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


    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,

      enrollmentNumber,

      course,
      department,
      year,
      semester,
      section,

      mentorCourse,
      mentorDepartment,
      mentorYear,
      mentorSemester,
      mentorSection,

      isHOD: role === "hod",
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getOrganizers = async (req, res) => {
  try {
    const organizers = await User.find(
      { role: "organizer" },
      "_id name email"
    ).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: organizers.length,
      data: organizers,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {

    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(

      id,

      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,

        role: req.body.role,

        enrollmentNumber: req.body.enrollmentNumber,
        course: req.body.course,
        department: req.body.department,
        year: req.body.year,
        semester: req.body.semester,
        section: req.body.section,

        mentorCourse: req.body.mentorCourse,
        mentorDepartment: req.body.mentorDepartment,
        mentorYear: req.body.mentorYear,
        mentorSection: req.body.mentorSection,

        isHOD: req.body.role === "hod",

      },

      {
        new: true,
        runValidators: true,
      }

    ).select("-password");

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Admin cannot be deleted
    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin cannot be deleted",
      });
    }

    // Delete from Firebase Authentication
    try {
        const firebaseUser = await admin.getUserByEmail(user.email);

        await admin.deleteUser(firebaseUser.uid);

      console.log(
        `Firebase user deleted: ${user.email}`
      );

    } catch (err) {
      // Firebase user doesn't exist
      if (err.code === "auth/user-not-found") {
        console.log(
          `Firebase user not found: ${user.email}`
        );
      } else {
        // IMPORTANT: Firebase deletion failed
        // so don't delete MongoDB user
        throw err;
      }
    }

    // Delete from MongoDB
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully from Firebase and MongoDB",
    });

  } catch (error) {
    console.error("Delete User Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Admin Profile
export const getAdminProfile = async (req, res) => {
  try {

    const admin = await User.findById(req.user._id).select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      data: admin,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
// Update Admin Profile
export const updateAdminProfile = async (req, res) => {
  try {

    const admin = await User.findById(req.user._id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;
    admin.phone = req.body.phone || admin.phone;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: admin,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};