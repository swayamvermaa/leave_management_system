import express from "express";
// import { applyLeave } from "../controllers/leaveController.js";
// import { protect } from "../middleware/authMiddleware.js";
import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";
import {
  applyLeave,
  getMyLeaves,
  getOrganizerLeaves,
  organizerDecision,
  getMentorLeaves,
  mentorDecision,
  getHodLeaves,
  hodDecision,
} from "../controllers/leaveController.js";

const router = express.Router();

// Student Apply Leave
router.post("/apply", protect, applyLeave);
router.get("/my-leaves", protect, getMyLeaves);
router.put(
  "/organizer/:id",
  protect,
  authorize("organizer"),
  organizerDecision
);
router.get(
  "/mentor",
  protect,
  authorize("mentor"),
  getMentorLeaves
);
router.put(
  "/mentor/:id",
  protect,
  authorize("mentor"),
  mentorDecision
);
router.get(
  "/hod",
  protect,
  authorize("hod"),
  getHodLeaves
);
router.put(
  "/hod/:id",
  protect,
  authorize("hod"),
  hodDecision
);

export default router;