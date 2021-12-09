import axios from 'axios'
import {
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAILURE,
} from '../constants/productConstants.js'

const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCTS_LIST_REQUEST,
    payload: {},
  })

  try {
    const products = (await axios.get('/api/products')).data

    dispatch({
      type: PRODUCTS_LIST_SUCCESS,
      payload: { products },
    })
  } catch (error) {
    dispatch({
      type: PRODUCTS_LIST_FAILURE,
      payload: {
        error: error.message,
      },
    })
  }
}

export function requestProducts() {
  return {
    type: PRODUCTS_LIST_REQUEST,
    payload: {},
  }
}

export const getProducts = () => async (dispatch) => {
  try {
    const products = await axios.get('/api/products')

    dispatch({
      type: PRODUCTS_LIST_SUCCESS,
      payload: { products: products.data },
    })
  } catch (error) {
    return {
      type: PRODUCTS_LIST_FAILURE,
      payload: { error: error.message },
    }
  }
}

export default listProducts
