import axios from 'axios'
import {
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from '../constants/productConstants'

const fetchProductDetails = (productID) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
  })

  try {
    const product = (await axios.get(`/api/products/${productID}`)).data

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: product,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAILURE,
      payload: error.message,
    })
  }
}

export default fetchProductDetails
