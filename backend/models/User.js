import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "organizer", "mentor", "hod", "admin"],
      default: "student",
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    // Student Details
    enrollmentNumber: {
      type: String,
      default: "",
    },

    course: {
      type: String,
      default: "",
    },

    department: {
      type: String,
      default: "",
    },

    year: {
      type: Number,
      default: 1,
    },

    semester: {
      type: Number,
      default: 1,
    },

    section: {
      type: String,
      default: "",
    },

    mentorCourse: {
        type: String,
        default: "",
      },

    mentorDepartment: {
      type: String,
      default: "",
    },

      mentorYear: {
        type: Number,
        default: null,
      },

      mentorSection: {
        type: String,
        default: "",
      },

    isHOD: {
      type: Boolean,
      default: false,
    },

    phone: {
      type: String,
      trim: true,
    },
    resetOTP: {
      type: String,
      default: null,
    },

    resetOTPExpire: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);