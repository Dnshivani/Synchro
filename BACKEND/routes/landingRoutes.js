import express from "express"
const router = express.Router();
import { landingRecords } from "../controllers/landingControllers.js";
router.get('/', landingRecords);
export default router;