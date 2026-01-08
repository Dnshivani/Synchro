import User from "../models/user.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/genetateToken.js"

export const registerUser = async(req, res, next) => {
    try {
        const {email, password} = req.body;
        const userExist = await User.findOne({email: email});
        if (userExist) {
            return  res.status(400).json({message : "user already exist"});
        }
        const salt = await  bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData = {
            ...req.body,
            password: hashedPassword
        }
        const newUser = await User.create(userData);
        res.status(201).json({
            message: "User created sucessfully",
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
            });
    } catch(e) {
        res.status(500).json({message : e.message});
    }
}

export const getUsers = async (req, res) => {
  try {
    const existed = await User.find();
    const count = await User.countDocuments();
    res.status(200).json({
        message: "User found",
        totalUsers: count,
        existed
    }) 
    } catch (e) {
        res.staus(400).json({message: error.message})
  }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email}).select('+password');
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            name : user.name,
            email : user.email,
            token : generateToken(user.id)
        })
    } else {
        return res.json(401).json({
            message : "invalid email or password!"
        })
    }
};