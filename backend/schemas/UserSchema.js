import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    emailID: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  try {
    this.password = await bcrypt.hash(this.password, 5)
    next()
  } catch (error) {
    console.log(error)
  }
})

userSchema.methods.verifyPassword = async function (pass) {
  try {
    return await bcrypt.compare(pass, this.password)
  } catch (error) {
    console.log(error)
  }
}

export default model('User', userSchema)
