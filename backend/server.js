import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
dotenv.config();

console.log(process.cwd());
console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");
import app from "./app.js";
import connectDB from "./config/db.js";

import eventRoutes from "./routes/eventRoutes.js";
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});