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
} from "../controllers/leaveController.js";"../controllers/leaveController.js";

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

export default router;