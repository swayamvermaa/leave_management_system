import Leave from "../models/Leave.js";

// Apply Leave
export const applyLeave = async (req, res) => {
  try {
    const {
      eventName,
      organizerName,
      reason,
      fromDate,
      toDate,
    } = req.body;

    // Validate required fields
    if (
      !eventName ||
      !organizerName ||
      !reason ||
      !fromDate ||
      !toDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Create leave application
    const leave = await Leave.create({
      student: req.user._id,
      eventName,
      organizerName,
      reason,
      fromDate,
      toDate,
    });

    res.status(201).json({
      success: true,
      message: "Leave applied successfully.",
      data: leave,
    });

  } catch (error) {
    console.error("Apply Leave Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};
// Get Logged-in Student Leave History
export const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ student: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leaves.length,
      data: leaves,
    });

  } catch (error) {
    console.error("Get Leave History Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Organizer Dashboard - Get All Pending Leaves
export const getOrganizerLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({
      organizerStatus: "Pending",
    })
      .populate("student", "name email enrollmentNumber department semester")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leaves.length,
      data: leaves,
    });
  } catch (error) {
    console.error("Organizer Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Organizer Approve / Reject Leave
export const organizerDecision = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be Approved or Rejected.",
      });
    }

    const leave = await Leave.findById(id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found.",
      });
    }

    leave.organizerStatus = status;
    leave.remarks = remarks || "";

    // If organizer rejects, final status becomes rejected
    if (status === "Rejected") {
      leave.finalStatus = "Rejected";
    }

    await leave.save();

    res.status(200).json({
      success: true,
      message: `Leave ${status} by Organizer.`,
      data: leave,
    });

  } catch (error) {
    console.error("Organizer Decision Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Mentor Dashboard - Get Pending Leaves
export const getMentorLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({
      organizerStatus: "Approved",
      mentorStatus: "Pending",
    })
      .populate(
        "student",
        "name email enrollmentNumber department semester"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leaves.length,
      data: leaves,
    });

  } catch (error) {
    console.error("Mentor Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};