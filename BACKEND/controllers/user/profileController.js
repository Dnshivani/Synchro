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

export const updateProfile = async (req, res) => {
    try {
        const {name, email} = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.user._id, {name, email}, {
            new : true,
            runValidators : true
        }
        );
        if (!updatedUser) {
            return res.status(404).json({message : "User not found"});
        }
        res.status(200).json({
            success : true,
            message : "profile updated successfully!",
            user: {
                id : updatedUser._id,
                name : updatedUser.name,
                email : updatedUser.email
            }
        })

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export const updatePassword = async (req, res) => {
    try {
        const {oldPassword, newPassword} = req.body;
        const user = await User.findById(req.user._id).select("+password");
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(403).json({message : "Old password is inCorrect"});

        user.password = newPassword;
        await user.save();
        res.status(200).json({
            success : true,
            message : "password changed successfully!",
            name : user.name
        })
    } catch (e) {
        res.status(500).json({message : "Server Error"})
    }
}