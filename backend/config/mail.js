import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: parseInt(process.env.BREVO_PORT),
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

console.log("HOST:", process.env.BREVO_HOST);
console.log("PORT:", process.env.BREVO_PORT);

export default transporter;