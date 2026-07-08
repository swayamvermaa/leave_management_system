// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import validator from "validator";

// // Register User
// export const registerUser = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       role,
//       enrollmentNumber,
//       department,
//       semester,
//     } = req.body;

//     // Check required fields
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill all required fields",
//       });
//     }

//     // Validate email
//     if (!validator.isEmail(email)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email address",
//       });
//     }

//     // Check existing user
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       enrollmentNumber,
//       department,
//       semester,
//     });

//     res.status(201).json({
//       success: true,
//       message: "User Registered Successfully",
//       user,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// // Login User
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check fields
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill all fields",
//       });
//     }

//     // Find user
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid Credentials",
//       });
//     }

//     // Generate JWT
//     const token = jwt.sign(
//       {
//         id: user._id,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "7d",
//       }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login Successful",
//       token,
//       user,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };
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
      password,
      role,
      enrollmentNumber,
      department,
      semester,
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
      password: hashedPassword,
      role: role || "student",
      enrollmentNumber,
      department,
      semester,
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