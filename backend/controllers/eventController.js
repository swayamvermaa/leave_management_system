import Event from "../models/Event.js";
import User from "../models/User.js";

// Create Event
export const createEvent = async (req, res) => {
  try {
    const {
        eventName,
        organizer,
        course,
        year,
        section,
        venue,
        maxParticipants,
        description,
        startDate,
        endDate,
    } = req.body;

    // Check Organizer
    const organizerUser = await User.findOne({
      _id: organizer,
      role: "organizer",
    });

    if (!organizerUser) {
      return res.status(404).json({
        success: false,
        message: "Organizer not found",
      });
    }

    const event = await Event.create({
        eventName,
        organizer,
        course,
        year,
        section,
        venue,
        maxParticipants,
        description,
        startDate,
        endDate,
        createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Events
// 

export const getEvents = async (req, res) => {
  try {

    const events = await Event.find()
      .populate("organizer", "name email")
      .sort({ createdAt: -1 });
      console.log(events);   

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// Update Event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Get Events for Student
export const getStudentEvents = async (req, res) => {
  try {

    const student = await User.findById(req.user._id);

    const events = await Event.find({
      course: student.course,
      year: student.year,
      section: student.section,
      status: "Active",
    })
      .populate("organizer", "name email")
      .sort({ startDate: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// Get Latest Events
export const getLatestEvents = async (req, res) => {
  try {

    const events = await Event.find({
      isActive: true,
    })
      .populate("organizer", "name email")
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });

  } catch (error) {

    console.log("Latest Events Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Upcoming Events for Notification
export const getUpcomingEvents = async (req, res) => {
  try {
    const today = new Date();

    const events = await Event.find({
      startDate: { $gte: today },
      isActive: true,
      status: "Active",
    })
      .populate("organizer", "name email")
      .sort({ startDate: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });

  } catch (error) {
    console.log("Upcoming Events Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};