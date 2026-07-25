import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Assigned automatically
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    hod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    eventName: {
      type: String,
      required: true,
      trim: true,
    },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    organizerName: {
      type: String,
      required: true,
      trim: true,
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    fromDate: {
      type: Date,
      required: true,
    },

    toDate: {
      type: Date,
      required: true,
    },

    proof: {
      type: String,
      default: "",
    },

    organizerStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    mentorStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    hodStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    finalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    // remarks: {
    //   type: String,
    //   default: "",
    // },

    organizerRemark: {
      type: String,
      default: "",
    },

    mentorRemark: {
      type: String,
      default: "",
    },

    hodRemark: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Leave", leaveSchema);