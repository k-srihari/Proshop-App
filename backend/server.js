import express from 'express'
import products from './data/products.js'

const app = express()

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  res.json(products.find((pr) => pr._id == req.params.id))
})

app.listen(4000, () => console.log('Server is listening on port 4000'))
