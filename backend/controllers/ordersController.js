import Order from '../schemas/OrderSchema.js'

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

export const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find({ orderedBy: req.userID })
    if (allOrders === null || allOrders.length === 0) {
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
    if (theOrder.orderedBy != req.userID)
      return res.status(401).json({ error: 'User Unauthorized!' })
    res.json(theOrder)
  } catch (error) {
    console.log(error.message)
    res.status(500).json(error)
  }
}
