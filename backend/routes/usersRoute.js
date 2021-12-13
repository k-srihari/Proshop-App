import { Router } from 'express'
import {
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
} from '../controllers/usersController.js'
import jwtVerifier from '../middleware/jwtVerifier.js'

const router = Router()

router.route('/login').post(loginUser)

router
  .route('/profile')
  .get(jwtVerifier, getUserProfile)
  .put(jwtVerifier, updateUserProfile)

router.route('/register').post(registerUser)

export default router
