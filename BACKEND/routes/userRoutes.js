import express from "express"
const router = express.Router();
import {registerUser, getUsers, loginUser, logout} from "../controllers/user/userController.js"
import {protect} from "../middleWare/protect.js";

router . post('/register', registerUser);
router . get('/', protect, getUsers);
router . post('/login', loginUser);
router . post('/logout', protect, logout);
export default router;