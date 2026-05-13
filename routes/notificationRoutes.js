import express from "express";

import {
  getNotifications,
  markNotificationRead,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", getNotifications);

router.put(
  "/read/:id",
  markNotificationRead
);

export default router;