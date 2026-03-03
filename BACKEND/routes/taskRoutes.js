import express from 'express'
const router = express.Router()
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getMyTasks,
  getTasksByStatus,
  assignTask,
} from '../controllers/taskController.js'
import { protect } from '../middleWare/protect.js'

router.get('/my-tasks', protect, getMyTasks)

router.get('/task/:taskId', protect, getTask)
router.put('/:taskId', protect, updateTask)
router.put('/:taskId/assign', protect, assignTask)
router.delete('/:taskId', protect, deleteTask)

router.post('/:projectId/create', protect, createTask)
router.get('/:projectId/status/:status', protect, getTasksByStatus)
router.get('/:projectId', protect, getTasks)

export default router
