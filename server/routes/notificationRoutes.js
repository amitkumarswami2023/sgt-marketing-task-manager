import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

// =========================
// Get Notifications
// =========================
router.get("/", protect, getNotifications);

// =========================
// Mark One Read
// =========================
router.patch("/:id/read", protect, markNotificationRead);

// =========================
// Mark All Read
// =========================
router.patch("/read-all", protect, markAllNotificationsRead);

// =========================
// Delete Notification
// =========================
router.delete("/:id", protect, deleteNotification);

export default router;
