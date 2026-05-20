import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
    {
        toUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        fromUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
        },
        data: {
            type: mongoose.Schema.Types.Mixed,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);