import express from "express";
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
  getOrganizerStats,
  getMentorStats,
  getHodStats,
} from "../controllers/leaveController.js";

const router = express.Router();

// Student Apply Leave
router.post("/apply", protect, applyLeave);
router.get("/my-leaves", protect, getMyLeaves);

router.get(
  "/organizer",
  protect,
  authorize("organizer"),
  getOrganizerLeaves
);
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
router.get(
  "/organizer/stats",
  protect,
  authorize("organizer"),
  getOrganizerStats
);
router.get(
  "/mentor/stats",
  protect,
  authorize("mentor"),
  getMentorStats
);
router.get(
  "/hod/stats",
  protect,
  authorize("hod"),
  getHodStats
);

export default router;