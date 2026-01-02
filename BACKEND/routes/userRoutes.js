import express from "express"
const router = express.Router();
import {registerUser, getUsers, loginUser} from "../controllers/userController.js"

router . post('/register', registerUser);
router . get('/', getUsers);
router . post('/login', loginUser);
export default router;