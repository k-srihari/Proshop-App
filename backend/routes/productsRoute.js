import { Router } from 'express'
import {
  addNewProduct,
  deleteProduct,
  getProducts,
  getProductsByID,
  updateProduct,
  uploadProductImage,
} from '../controllers/productsController.js'
import checkAdmin from '../middleware/checkAdmin.js'
import imageUploader from '../middleware/fileUploader.js'
import jwtVerifier from '../middleware/jwtVerifier.js'

const router = Router()

router.route('/').get(getProducts).post(jwtVerifier, checkAdmin, addNewProduct)

router
  .route('/:id')
  .get(getProductsByID)
  .delete(jwtVerifier, checkAdmin, deleteProduct)
  .put(jwtVerifier, checkAdmin, updateProduct)

router
  .route('/upload-image')
  .post(
    jwtVerifier,
    checkAdmin,
    imageUploader.single('picture'),
    uploadProductImage
  )

export default router
