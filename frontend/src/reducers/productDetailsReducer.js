import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
} from '../constants/productConstants.js'

const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { isLoading: true, ...state }
    case PRODUCT_DETAILS_SUCCESS:
      return { isLoading: false, product: action.payload }
    case PRODUCT_DETAILS_FAILURE:
      return { isLoading: false, error: action.payload }
    default:
      return state
  }
}

export default productDetailsReducer
