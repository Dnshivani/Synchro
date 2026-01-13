import express from 'express'
const router = express.Router()
import  {createNewProject, getProject}  from '../controllers/projectController.js'
import {protect} from "../middleWare/protect.js"
router.get('/', protect, (req, res) => {res.json({message:"this is the project route"})})
router.get('/:id', protect, getProject)
router.post('/create', protect, createNewProject);
export default router;