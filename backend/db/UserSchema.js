import { Schema, model } from 'mongoose'

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

export default model('User', userSchema)
