import { Router } from 'express'
import { loginUser } from '../controllers/usersController.js'

const router = Router()

router.route('/login').post(loginUser)

export default router
