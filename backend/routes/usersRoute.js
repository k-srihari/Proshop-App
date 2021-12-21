import { Router } from 'express'
import {
  deleteUser,
  editUser,
  getAllUsers,
  getUser,
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
} from '../controllers/usersController.js'
import checkAdmin from '../middleware/checkAdmin.js'
import jwtVerifier from '../middleware/jwtVerifier.js'

const router = Router()

router.route('/login').post(loginUser)

router
  .route('/profile')
  .get(jwtVerifier, getUserProfile)
  .put(jwtVerifier, updateUserProfile)

router.route('/register').post(registerUser)

router.route('/all').get(jwtVerifier, checkAdmin, getAllUsers)

router
  .route('/:id')
  .delete(jwtVerifier, checkAdmin, deleteUser)
  .put(jwtVerifier, checkAdmin, editUser)
  .get(jwtVerifier, checkAdmin, getUser)

export default router
