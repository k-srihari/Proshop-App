import Product from '../schemas/ProductSchema.js'

const getProducts = (_req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(500).json({ error: err.message }))
}

const getProductsByID = (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(500).json({ error: err.message }))
}

const addNewProduct = (req, res) => {
  const { name, brand, category, price, description, stocks, image } = req.body

  Product.create({
    createdBy: req.userID,
    productName: name,
    productImage: image,
    brand,
    category,
    price,
    stocksCount: stocks,
    description,
  })
    .then((newProduct) => res.status(201).json(newProduct))
    .catch((err) => res.status(500).json(err))
}

const deleteProduct = (req, res) => {
  Product.findById(req.params.id)
    .then((theProduct) => {
      if (!theProduct)
        return res
          .status(404)
          .json({ error: 'No Product found with the given ID!' })
      return theProduct.remove()
    })
    .then(() => res.json({ success: 'Product Successfully Deleted' }))
    .catch((err) => res.status(500).json(err))
}

const updateProduct = (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product)
        return res
          .status(404)
          .json({ error: 'No Product found with the given ID!' })
      product.productName = req.body.name || product.productName
      product.productImage = req.body.image || product.productImage
      product.brand = req.body.brand || product.brand
      product.category = req.body.category || product.category
      product.price = req.body.price || product.price
      product.description = req.body.description || product.description
      product.stocksCount = req.body.stocks || product.stocksCount
      return product.save()
    })
    .then((product) => res.json(product))
    .catch((err) => res.status(500).json(err))
}

const uploadProductImage = (req, res) => {
  res.json({ filePath: `/${req.file.path}` })
}

export {
  getProducts,
  getProductsByID,
  addNewProduct,
  deleteProduct,
  updateProduct,
  uploadProductImage,
}
