import Router from 'express-promise-router'
import { isAuth } from '../middlewares/auth.middleware.js'
import { profile, signIng, signOut, signUp } from '../controllers/auth.controller.js'
const router = Router()
router.post('/signin', signIng)
router.post('/signup', signUp)
router.post('/signout', signOut)
router.get('/profile', isAuth, profile)
export default router