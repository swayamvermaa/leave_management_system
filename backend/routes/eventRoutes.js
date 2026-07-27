import express from "express";
import {
  createEvent,
  getEvents,
  getStudentEvents,
  updateEvent,
  deleteEvent,
  getUpcomingEvents,
  getLatestEvents,
} from "../controllers/eventController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getEvents);

router.post(
  "/",
  protect,
  authorize("admin"),
  createEvent
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateEvent
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteEvent
);

router.get(
  "/student",
  protect,
  authorize("student"),
  getStudentEvents
);

router.get("/upcoming", getUpcomingEvents);

router.get("/latest", getLatestEvents);


export default router;