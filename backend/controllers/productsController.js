import Product from '../schemas/ProductSchema.js'

const getProducts = (_req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.json({ error: err.message }))
}

const getProductsByID = (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.json({ error: err.message }))
}

export { getProducts, getProductsByID }
