import express from "express";
// import { registerUser, loginUser, checkUser } from "../controllers/authController.js";
import {
  registerUser,
  loginUser,
  checkUser,
  forgotPassword,
  resetPassword,
  changePassword,
  checkOldPassword,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/check-user", checkUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.put(
  "/change-password",
  protect,
  changePassword
);
router.post(
  "/check-old-password",
  protect,
  checkOldPassword
);

export default router;