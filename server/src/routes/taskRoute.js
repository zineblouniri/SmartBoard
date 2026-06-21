import express from 'express'
import { createTask, deleteTask, getTaskById, getTasks, getTasksProject, updateTask } from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getTasks)
router.get('/project/:projectId', getTasksProject)
router.get('/:taskId', getTaskById)
router.post('/project/:projectId', createTask)
router.put('/:taskId', updateTask)
router.delete('/:taskId', deleteTask)

export default router