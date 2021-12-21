import { Router } from 'express'
import {
  addNewOrder,
  getAllOrders,
  getOneOrder,
  updateOrderToPaid,
} from '../controllers/ordersController.js'
import verifyJWT from '../middleware/jwtVerifier.js'

const router = Router()

router.route('/').post(verifyJWT, addNewOrder).get(verifyJWT, getAllOrders)

router.route('/:id').get(verifyJWT, getOneOrder)

router.route('/:id/pay').put(verifyJWT, updateOrderToPaid)

export default router
