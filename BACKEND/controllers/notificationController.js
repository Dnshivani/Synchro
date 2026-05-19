import notification from "../models/notification"

export const getNotifications = async(req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await notification.find(userId)
        .sort({createdAt : -1})
        .populate("fromUser", "name email");

        res.status(200).json({
            message : "Notifiations arrived",
            notifications
        })
    } catch (e) {
        res.status(403).json({
            message : "failed to load notifications"
        })
    }
}