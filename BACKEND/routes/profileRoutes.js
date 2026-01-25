import express from "express";
const router = express.Router()
import {protect} from "../middleWare/protect.js";
import { getUserProfile } from "../controllers/user/profileController.js";
router.get('/', protect, getUserProfile);
export default router;