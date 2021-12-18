import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'
import {
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
} from '../constants/userConstants'

const cartReducer = (state = { cartItems: [] }, action) => {
  if (action.type === CART_ADD_ITEM) {
    const givenItem = action.payload

    const itemAlreadyExists = state.cartItems.find(
      (item) => item.productID === givenItem.productID
    )

    if (itemAlreadyExists) {
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          return item.productID === givenItem.productID ? givenItem : item
        }),
      }
    }

    return { ...state, cartItems: [...state.cartItems, givenItem] }
  }
  if (action.type === CART_REMOVE_ITEM) {
    return {
      ...state,
      cartItems: [
        ...state.cartItems.filter((item) => item.productID !== action.payload),
      ],
    }
  }

  if (action.type === SAVE_SHIPPING_ADDRESS) {
    return { ...state, shippingAddress: action.payload }
  }

  if (action.type === SAVE_PAYMENT_METHOD) {
    return { ...state, paymentMethod: action.payload }
  }

  return state
}

export default cartReducer
