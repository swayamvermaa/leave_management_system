import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";

const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get("/", (req, res) => {
    res.send("Campus Duty Leave Backend Running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/leave", leaveRoutes);

export default app;