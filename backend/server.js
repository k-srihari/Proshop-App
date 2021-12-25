import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import connectDB from './db/MongoConnection.js'
import productsRoute from './routes/productsRoute.js'
import usersRoute from './routes/usersRoute.js'
import ordersRoute from './routes/ordersRoute.js'

dotenv.config()

connectDB()

const app = express()
app.use(express.json())

app.use('/api/products', productsRoute)
app.use('/api/users', usersRoute)
app.use('/api/orders', ordersRoute)

app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')))
app.use(
  '/frontend/public/images',
  express.static(path.join(path.resolve(), '/frontend/public/images'))
)

app.get('/api/config/paypal', (_req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

app.listen(process.env.SERVER_PORT, () =>
  console.log(
    `Server is running in '${process.env.MODE}', and is listening on port ${process.env.SERVER_PORT}`
  )
)
