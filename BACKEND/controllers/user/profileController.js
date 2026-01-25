import User from "../../models/user.js";
import projectModel from "../../models/project.js";

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password").lean();
        const recentProjects = await projectModel.find({
            $or: [{ owner: req.user._id }, { "members.user": req.user._id }]
        })
        .sort({ createdAt: -1 })
        .limit(3)
        .select("name description startDate");

        const totalProjects = await projectModel.countDocuments({
            $or: [{ owner: req.user._id }, { "members.user": req.user._id }]
        });

        res.status(200).json({
            status: "success",
            data: {
                user,
                stats: {
                    totalProjects,
                    activeRecentProjects: recentProjects 
                }
            }
        });
    } catch (e) {
        res.status(500).json({ message: "Error" });
    }
};
