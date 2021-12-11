import { CART_REMOVE_ITEM } from '../constants/cartConstants'

const removeFromCartAction = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cartReducer.cartItems)
  )
}

export default removeFromCartAction
