import Router from 'express-promise-router'
import { isAuth } from '../middlewares/auth.middleware.js'
import { profile, signIng, signOut, signUp } from '../controllers/auth.controller.js'
import { validateSchema } from '../middlewares/validate.middleware.js'
import { signinSchema, signupSchema } from '../schemas/auth.schema.js'
const router = Router()
router.post('/signin', validateSchema(signinSchema), signIng)
router.post('/signup', validateSchema(signupSchema), signUp)
router.post('/signout', signOut)
router.get('/profile', isAuth, profile)
export default router