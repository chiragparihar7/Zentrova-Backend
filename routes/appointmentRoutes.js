import express from "express";

import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  checkInAppointment,
  checkOutAppointment,
  addAppointmentNote,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/", createAppointment);

router.get("/", getAppointments);

router.get("/:id", getAppointmentById);

router.put("/:id", updateAppointment);

router.delete("/:id", deleteAppointment);

router.put(
  "/check-in/:id",
  checkInAppointment
);

router.put(
  "/check-out/:id",
  checkOutAppointment
);

router.post(
  "/add-note/:id",
  addAppointmentNote
);

export default router;