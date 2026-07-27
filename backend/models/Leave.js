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
        default: null,
      },

      semester: {
        type: Number,
        default: null,
      },

      section: {
        type: String,
        default: "",
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

    organizerRemark: {
      type: String,
      default: "",
    },
        organizerDecisionAt: {
        type: Date,
        default: null,
      },


    mentorRemark: {
      type: String,
      default: "",
    },

          mentorDecisionAt: {
        type: Date,
        default: null,
      },

    hodRemark: {
      type: String,
      default: "",
    },

      hodDecisionAt: {
        type: Date,
        default: null,
      },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Leave", leaveSchema);