import express from "express"
const router = express.Router();
import { protect } from "../middleWare/protect.js";
import {createWorkSpace} from "../controllers/workSpaceController.js"
router.post('/', protect, createWorkSpace);
export default router;