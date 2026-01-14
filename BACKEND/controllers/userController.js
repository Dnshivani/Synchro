import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/genetateToken.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(409).json({ message: "user already exist" });
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      ...req.body,
      password: hashedPassword,
    };
    const newUser = await User.create(userData);
    res.status(201).json({
      success: true,
      message: "User created sucessfully",
      data: {
        name: newUser.name,
        email: newUser.email,
      },
      token: generateToken(newUser._id),
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const existed = await User.find();
    const count = await User.countDocuments();
    res.status(200).json({
      success: true,
      message: "User found",
      totalUsers: count,
      existed,
    });
  } catch (e) {
    res.staus(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    const match = await bcrypt.compare(password, user.password);
    if (!user) {
      return res.status(401).json({
        message: "user does not exist",
      });
    }
    if (!match) {
      return res.status(403).json({ message: "incorrect Password!" });
    }
    res.json({
      success: true,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (e) {
    res.status(404).json({message : "invalid userName or password"})
  }
};
