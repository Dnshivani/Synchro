import express from "express"
const router = express.Router();
import { protect } from "../middleWare/protect.js";
import {createWorkSpace} from "../controllers/workSpaceController.js"
router.get('/', (req, res) => {res.json({message : "this is the workSpace Route"})})
router.post('/create', protect, createWorkSpace);
export default router;