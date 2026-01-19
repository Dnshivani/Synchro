import express from "express"
const router = express.Router();
import { landingRecords } from "../controllers/landingControllers";
router.get('/', landingRecords);
export default router;