import Leave from "../models/Leave.js";
import User from "../models/User.js";

// Apply Leave
export const applyLeave = async (req, res) => {
  try {
    const {
        event,
        eventName,
        organizer,
        organizerName,
        reason,
        fromDate,
        toDate,
    } = req.body;

    // Validate required fields
    if (
        !event ||
        !reason ||
        !fromDate ||
        !toDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

const student = await User.findById(req.user._id);

// console.log("===== STUDENT =====");
// console.log(student);

const mentor = await User.findOne({
  role: "mentor",
  mentorCourse: student.course,
  mentorYear: Number(student.year),
  mentorSection: student.section,
});

// console.log("===== MENTOR =====");
// console.log(mentor);

const hod = await User.findOne({
  role: "hod",
  course: student.course,
  isHOD: true,
});

// console.log("===== HOD =====");
// console.log(hod);


console.log("===== SAVING DATA =====");
console.log({
  student: student._id,
  mentor: mentor ? mentor._id : null,
  hod: hod ? hod._id : null,
});

// Create leave

console.log("========== APPLY ==========");

console.log({
  event,
  organizer,
  eventName,
  organizerName,
});
 
const leave = await Leave.create({
  student: student._id,

  mentor: mentor ? mentor._id : null,

  hod: hod ? hod._id : null,

  event,              // NEW
  organizer,          // NEW

  course: student.course,
  department: student.department,
  year: student.year,
  semester: student.semester,
  section: student.section,

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
        organizer: req.user._id,
        organizerStatus: "Pending",
        })
        .populate(
          "student",
          "name email enrollmentNumber course department year semester section"
        )
        .populate(
          "event",
          "eventName startDate endDate venue organizer"
        )
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
    leave.organizerRemark = remarks || "";

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

export const getMentorLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({
      mentor: req.user._id,
      organizerStatus: "Approved",
      mentorStatus: "Pending",
    }).populate(
      "student",
      "name enrollmentNumber course year semester section"
    );

    res.status(200).json({
      success: true,
      count: leaves.length,
      data: leaves,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Organizer Dashboard Stats
export const getOrganizerStats = async (req, res) => {
  try {
    const leaves = await Leave.find({
      organizer: req.user._id,
    });

    const pending = leaves.filter(
      (leave) => leave.organizerStatus === "Pending"
    ).length;

    const approved = leaves.filter(
      (leave) => leave.organizerStatus === "Approved"
    ).length;

    const rejected = leaves.filter(
      (leave) => leave.organizerStatus === "Rejected"
    ).length;

    res.status(200).json({
      success: true,
      pending,
      approved,
      rejected,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// Mentor Approve / Reject Leave
export const mentorDecision = async (req, res) => {
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

    // Organizer must approve first
    if (leave.organizerStatus !== "Approved") {
      return res.status(400).json({
        success: false,
        message: "Organizer approval is required first.",
      });
    }

    leave.mentorStatus = status;
    leave.mentorRemark = remarks || "";

    if (status === "Rejected") {
      leave.finalStatus = "Rejected";
    }

    await leave.save();

    res.status(200).json({
      success: true,
      message: `Leave ${status} by Mentor.`,
      data: leave,
    });

  } catch (error) {
    console.error("Mentor Decision Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getMentorStats = async (req, res) => {
  try {
    const leaves = await Leave.find({
      mentor: req.user._id,
      organizerStatus: "Approved",
    });

    const pending = leaves.filter(
      (leave) => leave.mentorStatus === "Pending"
    ).length;

    const approved = leaves.filter(
      (leave) => leave.mentorStatus === "Approved"
    ).length;

    const rejected = leaves.filter(
      (leave) => leave.mentorStatus === "Rejected"
    ).length;

    res.status(200).json({
      success: true,
      pending,
      approved,
      rejected,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// HOD Dashboard - Get Pending Leaves
export const getHodLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({
      hod: req.user._id,
      organizerStatus: "Approved",
      mentorStatus: "Approved",
      hodStatus: "Pending",
    })
      .populate(
      "student",
      "name email enrollmentNumber course department year semester section"
    )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leaves.length,
      data: leaves,
    });

  } catch (error) {
    console.error("HOD Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// HOD Approve / Reject Leave
export const hodDecision = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;

    // Validate status
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be Approved or Rejected.",
      });
    }

    // Find leave
    const leave = await Leave.findById(id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found.",
      });
    }

    // Check previous approvals
    if (
      leave.organizerStatus !== "Approved" ||
      leave.mentorStatus !== "Approved"
    ) {
      return res.status(400).json({
        success: false,
        message: "Organizer and Mentor approval required first.",
      });
    }

    // Update HOD status
    leave.hodStatus = status;
    leave.hodRemark = remarks || "";

    // Final Status
    leave.finalStatus = status;

    await leave.save();

    res.status(200).json({
      success: true,
      message: `Leave ${status} by HOD.`,
      data: leave,
    });

  } catch (error) {
    console.error("HOD Decision Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getHodStats = async (req, res) => {
  try {
    const leaves = await Leave.find({
      hod: req.user._id,
      organizerStatus: "Approved",
      mentorStatus: "Approved",
    });

    const pending = leaves.filter(
      (leave) => leave.hodStatus === "Pending"
    ).length;

    const approved = leaves.filter(
      (leave) => leave.hodStatus === "Approved"
    ).length;

    const rejected = leaves.filter(
      (leave) => leave.hodStatus === "Rejected"
    ).length;

    res.status(200).json({
      success: true,
      pending,
      approved,
      rejected,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};