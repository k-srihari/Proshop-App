import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/MongoConnection.js'
import productsRoute from './routes/productsRoute.js'

dotenv.config()

connectDB()

const app = express()

app.use('/api/products', productsRoute)

app.listen(process.env.SERVER_PORT, () =>
  console.log(
    `Server is running in '${process.env.MODE}', and is listening on port ${process.env.SERVER_PORT}`
  )
)
