import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'

const addToCartAction = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        productID: data._id,
        productName: data.productName,
        image: data.productImage,
        price: data.price,
        stock: data.stocksCount,
        qty,
      },
    })
  } catch (error) {
    console.log(error)
  }

  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cartReducer.cartItems)
  )
}

export default addToCartAction
