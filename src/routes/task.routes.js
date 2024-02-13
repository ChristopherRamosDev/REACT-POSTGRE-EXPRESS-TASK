import Router from 'express-promise-router'
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from './../controllers/task.controller.js'
import { isAuth } from '../middlewares/auth.middleware.js'
import { validateSchema } from '../middlewares/validate.middleware.js'
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema.js'

const router = Router()
router.get('/tasks', isAuth, getAllTasks)
router.get('/task/:id', isAuth, getTask)
router.post('/task', isAuth, validateSchema(createTaskSchema), createTask)
router.put('/task/:id', isAuth, validateSchema(updateTaskSchema), updateTask)
router.delete('/task/:id', isAuth, deleteTask)
export default router