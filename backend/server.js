import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
dotenv.config();

console.log(process.cwd());
console.log("BREVO_HOST =", process.env.BREVO_HOST);
console.log("BREVO_PORT =", process.env.BREVO_PORT);
console.log("BREVO_USER =", process.env.BREVO_USER);
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