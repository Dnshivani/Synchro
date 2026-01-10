import express from 'express'
const router = express.Router()
import { createNewProject } from '../controllers/projectController'
import {protect} from "../middleWare/protect"
router.post('/create', )