import User from "../models/user.js";

export const landingRecords = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({
      success: true,
      message: "Syncro the manager companion!",
      totalUsers: count
    });
  } catch (e) {
    res.staus(500).json({ message: error.message });
  }
};