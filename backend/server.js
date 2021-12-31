import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import connectDB from './db/MongoConnection.js'
import productsRoute from './routes/productsRoute.js'
import usersRoute from './routes/usersRoute.js'
import ordersRoute from './routes/ordersRoute.js'

dotenv.config()

connectDB(process.env.MONGO_ATLAS_URI)

const app = express()
app.use(express.json())

app.use('/api/products', productsRoute)
app.use('/api/users', usersRoute)
app.use('/api/orders', ordersRoute)
app.get('/api/config/paypal', (_req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use(
  '/uploads/images',
  express.static(path.join(path.resolve(), '/uploads/images'))
)
app.use(
  '/frontend/public/images',
  express.static(path.join(path.resolve(), '/frontend/public/images'))
)

if (process.env.MODE === 'production') {
  app.use(express.static(path.join(path.resolve(), '/frontend/build')))
  app.get('*', (_req, res) =>
    res.sendFile(path.resolve(path.resolve(), '/frontend/build/index.html'))
  )
}

app.listen(process.env.PORT || 4000, () =>
  console.log(
    `Server is running in '${process.env.MODE}', and is listening on port ${
      process.env.PORT || 4000
    }`
  )
)
