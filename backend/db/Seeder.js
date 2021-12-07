import dotenv from 'dotenv'
import connectDB from './MongoConnection.js'
import User from './UserSchema.js'
import Product from './ProductSchema.js'
import users from '../sample_data/users.js'
import products from '../sample_data/products.js'

dotenv.config()
connectDB()

function importData() {
  User.insertMany(users)
    .then((insertedUsers) => {
      console.log('Inserted users successfully! count: ', insertedUsers.length)
      const adminUser = insertedUsers[0]._id
      const sampleProducts = products.map((pr) => {
        return { ...pr, createdBy: adminUser }
      })
      Product.insertMany(sampleProducts)
        .then((inseretedProducts) => {
          console.log(
            'Inserted products successfully! count: ',
            inseretedProducts.length
          )
        })
        .catch((error) => {
          console.log('Error inserting users! \n', error)
        })
    })
    .catch((error) => {
      console.log('Error inserting products! \n', error)
    })
}

function destroyData() {
  User.deleteMany({}, (err, _res) => {
    if (err) {
      console.log('Error deleting users! \n', err)
    } else {
      console.log("Successfully removed all 'users' from the database.")
    }
  })
  Product.deleteMany({}, (err, _res) => {
    if (err) {
      console.log('Error deleting products! \n', err)
    } else {
      console.log("Successfully removed all 'products' from the database.")
    }
  })
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
