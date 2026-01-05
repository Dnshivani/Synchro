import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
import User from "../models/user.js"

export const protect = async (req, res, next) => {
    let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(' ')[1];
                const decoded = await jwt.verify(token, process.env.SECRET_KEY);
                console.log(decoded);
                req.user = await User.findById(decoded.id).select('-password');
                next();
            } catch(e) {
                return res.status(401).json({
                    message: "unauthorized"
                })
            }
        } else {
            return res.status(403).json({
                message: "Unauthorized"
            })
        }
}