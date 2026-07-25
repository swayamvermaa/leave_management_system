import nodemailer from "nodemailer";

const sendEmail = async (email, subject, html) => {

  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");

  const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

      user: process.env.EMAIL_USER,

      pass: process.env.EMAIL_PASS,

    },

  });

  await transporter.sendMail({

    from: `"CDLMS" <${process.env.EMAIL_USER}>`,

    to: email,

    subject,

    html,

  });

};

export default sendEmail;