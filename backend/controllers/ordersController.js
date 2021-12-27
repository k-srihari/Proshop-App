import Order from '../schemas/OrderSchema.js'
import User from '../schemas/UserSchema.js'

export const addNewOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ error: 'No items in the order!' })
  }

  try {
    const newOrder = await Order.create({
      orderedBy: req.userID,
      orderItems,
      shippingAddress,
      paymentMode: paymentMethod,
      shippingPrice,
      taxPrice,
      totalPrice,
    })

    res.status(201).json(newOrder)
  } catch (error) {
    console.log(error.message)
    res.status(500).json(error)
  }
}

export const getUserOrders = async (req, res) => {
  try {
    const allOrders = await Order.find({ orderedBy: req.userID })
    if (allOrders === null) {
      return res.status(404).json({ error: 'No orders found for the user!' })
    }
    res.json(allOrders)
  } catch (error) {
    console.log(error.message)
    res.status(500).json(error)
  }
}

export const getOneOrder = async (req, res) => {
  try {
    const theOrder = await Order.findById(req.params.id)
    if (!theOrder)
      return res
        .status(404)
        .json({ error: 'No order found for the given orderID!' })
    const isAdminRequest = (await User.findById(req.userID)).isAdmin
    if (theOrder.orderedBy != req.userID && !isAdminRequest)
      return res.status(401).json({ error: 'User Unauthorized!' })
    res.json(theOrder)
  } catch (error) {
    console.log(error.message)
    res.status(500).json(error)
  }
}

export const updateOrderToPaid = async (req, res) => {
  try {
    const theOrder = await Order.findById(req.params.id)
    if (!theOrder)
      return res
        .status(404)
        .json({ error: 'No order found for the given orderID!' })
    const isAdminRequest = (await User.findById(req.userID)).isAdmin
    if (theOrder.orderedBy != req.userID && !isAdminRequest)
      return res.status(401).json({ error: 'User Unauthorized!' })
    theOrder.isPaid = true
    theOrder.paidAt = Date.now()
    let {
      id,
      status,
      update_time,
      payer: { email_address },
    } = req.body.paymentDetails
    theOrder.paymentInfo = {
      id,
      status,
      updateTime: update_time,
      payerEmail: email_address,
    }
    const updatedOrder = await theOrder.save()
    res.json(updatedOrder)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export const getAllOrders = (_req, res) => {
  Order.find()
    .then((data) => res.json(data))
    .catch((err) => res.send(err))
}

export const updateOrderToDelivered = async (req, res) => {
  try {
    const theOrder = await Order.findById(req.params.id)
    if (!theOrder)
      return res.json({ error: 'No order found for the given ID!' })
    if (!theOrder.isPaid)
      return res.json({ error: 'Order is not paid yet to mark as delivered!' })
    theOrder.isDelivered = true
    theOrder.deliveredAt = Date.now()
    const updatedOrder = await theOrder.save()
    res.json(updatedOrder)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

export const deleteOrder = (req, res) => {
  Order.findByIdAndDelete(req.params.id, {}, (err) => {
    if (err) return res.status(500).json(err)
    res.json({ success: 'Order deleted successfully' })
  })
}
