import Router from 'express-promise-router'

import { createTask, deleteTask, getAllTasks, getTask, updateTask } from './../controllers/task.controller.js'
import { isAuth } from '../middlewares/auth.middleware.js'
const router = Router()
router.get('/tasks', isAuth, getAllTasks)
router.get('/task/:id', isAuth, getTask)
router.post('/task', isAuth, createTask)
router.put('/task/:id', isAuth, updateTask)
router.delete('/task/:id', isAuth, deleteTask)
export default router