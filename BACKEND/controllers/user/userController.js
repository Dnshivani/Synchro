import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/genetateToken.js";

export const registerUser = async (req, res, next) => {
  try {
    const {name, email, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

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
      existed
    });
  } catch (e) {
    res.staus(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "user does not exist",
      });
    }
    const match = await bcrypt.compare(password, user.password);
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
    res.status(500).json({message : "invalid userName or password"})
  }
};

