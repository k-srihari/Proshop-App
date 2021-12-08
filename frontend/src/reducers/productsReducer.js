import {
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAILURE,
} from '../constants/productConstants.js'

const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCTS_LIST_REQUEST:
      return { isLoading: true, products: [] }
    case PRODUCTS_LIST_SUCCESS:
      return { isLoading: false, products: action.payload.products }
    case PRODUCTS_LIST_FAILURE:
      return { isLoading: false, error: action.payload.error }
    default:
      return state
  }
}

export default productsReducer
