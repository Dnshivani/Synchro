import express from "express";
const router = express.Router()
import {protect} from "../middleWare/protect.js";
import { getUserProfile, updateProfile, updatePassword} from "../controllers/user/profileController.js";
router.get('/', protect, getUserProfile);
router.put('/update', protect, updateProfile);
router.put('/changePassword', protect, updatePassword);
export default router;