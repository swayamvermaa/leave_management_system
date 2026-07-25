import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import User from "../models/User.js";
import connectDB from "../config/db.js";

const createAdmin = async () => {
  try {
    // Connect using existing DB config
    await connectDB();

    const existingAdmin = await User.findOne({
      email: "admin@college.com",
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "System Admin",
      email: "admin@college.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully.");

    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();