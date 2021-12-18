import { Router } from 'express'
import {
  addNewOrder,
  getAllOrders,
  getOneOrder,
} from '../controllers/ordersController.js'
import verifyJWT from '../middleware/jwtVerifier.js'

const router = Router()

router.route('/').post(verifyJWT, addNewOrder).get(verifyJWT, getAllOrders)

router.route('/:id').get(verifyJWT, getOneOrder)

export default router
