import User from "../models/user.js"
import bcrypt from "bcrypt"

const registerUser = async(req, res, next) => {
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
            message: "User created sucessfully"
            });
    } catch(e) {
        res.status(500).json({message : e.message});
    }
}
export default registerUser;