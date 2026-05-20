import express from "express";
const router = express.Router();

import {
  getNotifications,
  getNotification,
  sendNotification,
  markAsRead,
  markAllRead,
  deleteNotification,
  getUnreadCount,
} from "../controllers/notificationController.js";
import { protect } from "../middleWare/protect.js";

router.get("/", protect, getNotifications);
router.get("/unread/count", protect, getUnreadCount);
router.get("/:id", protect, getNotification);
router.post("/", protect, sendNotification);
router.patch("/:id/read", protect, markAsRead);
router.patch("/markAllRead", protect, markAllRead);
router.delete("/:id", protect, deleteNotification);

export default router;
