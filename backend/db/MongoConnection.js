import mongoose from 'mongoose'

export default function connectDB() {
  try {
    mongoose
      .connect('mongodb://localhost:27017/proshop-products')
      .then((con) =>
        console.log(
          'Connected to MongoDB at: ' +
            con.connection.host +
            ':' +
            con.connection.port
        )
      )
  } catch (error) {
    console.log('Error connecting to MongoDB! [' + error.message + ']')
  }
}
