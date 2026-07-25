import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
      trim: true,
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: String,
      required: true,
      enum: ["BCA", "BBA", "B.Tech", "MBA"],
    },

    year: {
      type: Number,
      required: true,
    },

    section: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },
  
    venue: {
      type: String,
      trim: true,
      default: "",
    },

    maxParticipants: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["Active", "Completed"],
      default: "Active",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    description: {
        type: String,
        default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Event", eventSchema);