import { Router } from 'express'
import {
  addNewOrder,
  deleteOrder,
  getAllOrders,
  getOneOrder,
  getUserOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/ordersController.js'
import verifyJWT from '../middleware/jwtVerifier.js'
import checkAdmin from '../middleware/checkAdmin.js'

const router = Router()

router.route('/').post(verifyJWT, addNewOrder).get(verifyJWT, getUserOrders)

router
  .route('/:id')
  .get(verifyJWT, getOneOrder)
  .delete(verifyJWT, checkAdmin, deleteOrder)

router.route('/:id/pay').put(verifyJWT, updateOrderToPaid)

router.route('/:id/deliver').put(verifyJWT, checkAdmin, updateOrderToDelivered)

router.route('/all/orders').get(verifyJWT, checkAdmin, getAllOrders)

export default router
