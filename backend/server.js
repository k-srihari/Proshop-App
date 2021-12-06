import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'
import connectDB from './db/MongoConnection.js'

dotenv.config()

connectDB()

const app = express()

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  res.json(products.find((pr) => pr._id == req.params.id))
})

app.listen(process.env.SERVER_PORT, () =>
  console.log(
    `Server is running in '${process.env.MODE}', and is listening on port ${process.env.SERVER_PORT}`
  )
)
