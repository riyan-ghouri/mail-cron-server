import express from "express";
import cron from "node-cron";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Mail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Cron job: runs every 1 minute
cron.schedule("* * * * *", async () => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL,
      subject: "⏱️ Cron Test Email",
      text: "This email is sent every 1 minute. Server is alive.",
    });

    console.log("✅ Email sent at", new Date().toLocaleTimeString());
  } catch (err) {
    console.error("❌ Email error:", err.message);
  }
});

app.get("/", (req, res) => {
  res.send("Server running. Email cron active.");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
