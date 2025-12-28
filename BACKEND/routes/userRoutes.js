import express from "express"
const router = express.Router();
import {registerUser, getUsers} from "../controllers/userController.js"

router . post('/register', registerUser);
router . get('/', getUsers);
export default router;