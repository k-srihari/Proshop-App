import { Router } from 'express'
import Product from '../schemas/ProductSchema.js'

const router = Router()

router.get('/', (_req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.json({ error: err.message }))
})

router.get('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.json({ error: err.message }))
})

export default router
