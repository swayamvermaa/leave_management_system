import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
// Middleware
app.use(cors({
    origin: [
      "http://localhost:5173",
      "https://leave-management-system-seven-weld.vercel.app",
    ],
    credentials: true,
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get("/", (req, res) => {
    res.send("Campus Duty Leave Backend Running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/admin", adminRoutes);

export default app;