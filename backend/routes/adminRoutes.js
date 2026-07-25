import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  getDashboardStats,
  getAllUsers,
  createUser,
  getOrganizers,
  updateUser,
  deleteUser,
  getAdminProfile,
  updateAdminProfile,
} from "../controllers/adminController.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  getDashboardStats
);

router.get(
  "/users",
  protect,
  authorize("admin"),
  getAllUsers
);

router.post(
  "/users",
  protect,
  authorize("admin"),
  createUser
);
router.get(
  "/organizers",
  protect,
  authorize("admin"),
  getOrganizers
);
router.put(
  "/users/:id",
  protect,
  authorize("admin"),
  updateUser
);
router.delete(
  "/users/:id",
  protect,
  authorize("admin"),
  deleteUser
);
router.get(
  "/profile",
  protect,
  authorize("admin"),
  getAdminProfile
);
router.put(
  "/profile",
  protect,
  authorize("admin"),
  updateAdminProfile
);

export default router;