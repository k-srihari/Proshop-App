import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/MongoConnection.js'
import productsRoute from './routes/productsRoute.js'
import usersRoute from './routes/usersRoute.js'

dotenv.config()

connectDB()

const app = express()
app.use(express.json())

app.use('/api/products', productsRoute)
app.use('/api/users', usersRoute)

app.listen(process.env.SERVER_PORT, () =>
  console.log(
    `Server is running in '${process.env.MODE}', and is listening on port ${process.env.SERVER_PORT}`
  )
)
