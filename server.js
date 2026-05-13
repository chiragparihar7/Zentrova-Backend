import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import connectDB from "./config/db.js";

// ROUTES
import leadRoutes from "./routes/leadRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/project.routes.js";

// APPOINTMENT ROUTES
import appointmentRoutes from "./routes/appointmentRoutes.js";

// NOTIFICATION ROUTES
import notificationRoutes from "./routes/notificationRoutes.js";

// CRON JOBS
import "./jobs/cronJobs.js";

const app = express();

/* =========================
   DATABASE CONNECTION
========================= */

connectDB();

/* =========================
   MIDDLEWARES
========================= */

// SECURITY HEADERS
app.use(helmet());

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://zentrova-frontend.vercel.app",
    ],

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
    ],

    credentials: true,
  })
);

// LOGGING
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// BODY PARSER
app.use(express.json());

/* =========================
   ROUTES
========================= */

app.get("/", (req, res) => {
  res.send("Zentrova API Running 🚀");
});

// AUTH
app.use("/api/auth", authRoutes);

// LEADS
app.use("/api/leads", leadRoutes);

// PROJECTS
app.use("/api/projects", projectRoutes);

// APPOINTMENTS
app.use(
  "/api/appointments",
  appointmentRoutes
);

// NOTIFICATIONS
app.use(
  "/api/notifications",
  notificationRoutes
);

/* =========================
   ERROR HANDLING
========================= */

// 404 HANDLER
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

/* =========================
   SERVER START
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});