import axios from 'axios'
import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from '../constants/orderConstants.js'

export const addNewOrder = (orderData) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_CREATE_REQUEST,
  })

  try {
    const { data } = await axios.post('/api/orders', orderData, {
      headers: {
        Authorization: `Bearer ${
          getState().userAuthenticationReducer.userInfo.token
        }`,
        'Content-Type': 'application/json',
      },
    })

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAILURE,
      payload: error,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_DETAILS_REQUEST,
  })

  try {
    const { data } = await axios.get(`/api/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${
          getState().userAuthenticationReducer.userInfo.token
        }`,
      },
    })

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAILURE,
      payload: error.message,
    })
  }
}
