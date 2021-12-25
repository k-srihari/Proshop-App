import mongoose from 'mongoose'

const { Schema, model } = mongoose

const reviewSchema = new Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    comments: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const productSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    productName: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ratings: [reviewSchema],
    avgRating: {
      type: Number,
      default: 0.0,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    stocksCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

export default model('Product', productSchema)
