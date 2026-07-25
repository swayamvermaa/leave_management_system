import express from "express";
import { registerUser, loginUser, checkUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/check-user", checkUser);

export default router;