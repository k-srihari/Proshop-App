import mongoose from 'mongoose'

const { Schema, model } = mongoose

const orderSchema = new Schema(
  {
    orderedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        itemName: {
          type: String,
          required: true,
        },
        itemImage: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        itemID: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    paymentMode: {
      type: String,
      required: true,
    },
    paymentInfo: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
      updateTime: {
        type: String,
      },
      payerEmail: {
        type: String,
      },
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

export default model('Order', orderSchema)
