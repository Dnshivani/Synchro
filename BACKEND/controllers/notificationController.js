import Notification from "../models/notification";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({ toUser: userId })
            .sort({ createdAt: -1 })
            .populate("fromUser", "name email avatar");

        res.status(200).json({
            message: "Notifications loaded",
            count: notifications.length,
            notifications,
        });
    } catch (e) {
        res.status(500).json({
            message: "Failed to load notifications",
            error: e.message,
        });
    }
};

export const getNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notif = await Notification.findById(id).populate(
            "fromUser",
            "name email avatar"
        );
        if (!notif) return res.status(404).json({ message: "Notification not found" });
        if (notif.toUser.toString() !== req.user._id.toString())
            return res.status(403).json({ message: "Not authorized" });

        res.status(200).json({ message: "Notification fetched", data: notif });
    } catch (e) {
        res.status(500).json({ message: "Error fetching notification", error: e.message });
    }
};

export const sendNotification = async (req, res) => {
    try {
        const fromUser = req.user._id;
        const { toUser, title, message, data } = req.body;

        if (!toUser || !title) {
            return res.status(400).json({ message: "toUser and title are required" });
        }

        const newNotif = await Notification.create({
            toUser,
            fromUser,
            title,
            message,
            data,
        });

        await newNotif.populate("fromUser", "name email avatar");
        res.status(201).json({ message: "Notification sent", data: newNotif });
    } catch (e) {
        res.status(500).json({ message: "Failed to send notification", error: e.message });
    }
};

export const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notif = await Notification.findById(id);
        if (!notif) return res.status(404).json({ message: "Notification not found" });
        if (notif.toUser.toString() !== req.user._id.toString())
            return res.status(403).json({ message: "Not authorized" });

        notif.isRead = true;
        await notif.save();
        res.status(200).json({ message: "Notification marked as read", data: notif });
    } catch (e) {
        res.status(500).json({ message: "Failed to mark as read", error: e.message });
    }
};

export const markAllRead = async (req, res) => {
    try {
        const result = await Notification.updateMany(
            { toUser: req.user._id, isRead: false },
            { $set: { isRead: true } }
        );

        res.status(200).json({
            message: "All notifications marked as read",
            modifiedCount: result.modifiedCount ?? result.nModified ?? 0,
        });
    } catch (e) {
        res.status(500).json({ message: "Failed to mark all as read", error: e.message });
    }
};

export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notif = await Notification.findById(id);
        if (!notif) return res.status(404).json({ message: "Notification not found" });
        if (notif.toUser.toString() !== req.user._id.toString())
            return res.status(403).json({ message: "Not authorized" });

        await Notification.findByIdAndDelete(id);
        res.status(200).json({ message: "Notification deleted" });
    } catch (e) {
        res.status(500).json({ message: "Failed to delete notification", error: e.message });
    }
};

export const getUnreadCount = async (req, res) => {
    try {
        const count = await Notification.countDocuments({ toUser: req.user._id, isRead: false });
        res.status(200).json({ message: "Unread notifications count", count });
    } catch (e) {
        res.status(500).json({ message: "Failed to get unread count", error: e.message });
    }
};