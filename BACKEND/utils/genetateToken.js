import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const key = process.env.SECRET_KEY;

const generateToken = (id) => {
    return jwt.sign({id}, key, {
        expiresIn : "3m"
    })
}

module.exports = generateToken;