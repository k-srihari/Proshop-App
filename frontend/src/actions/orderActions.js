import axios from 'axios'
import {
  ORDERS_GET_MINE_FAILURE,
  ORDERS_GET_MINE_REQUEST,
  ORDERS_GET_MINE_SUCCESS,
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAYMENT_REQUEST,
  ORDER_PAYMENT_SUCCESS,
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

export const recordOrderPayment =
  (orderId, paymentDetails) => async (dispatch, getState) => {
    dispatch({
      type: ORDER_PAYMENT_REQUEST,
    })
    try {
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        { paymentDetails },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
              getState().userAuthenticationReducer.userInfo.token
            }`,
          },
        }
      )

      dispatch({
        type: ORDER_PAYMENT_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAILURE,
        payload: error,
      })
    }
  }

export const getUserOrders = () => async (dispatch, getState) => {
  dispatch({
    type: ORDERS_GET_MINE_REQUEST,
  })
  try {
    const { data } = await axios.get('/api/orders', {
      headers: {
        Authorization: `Bearer ${
          getState().userAuthenticationReducer.userInfo.token
        }`,
      },
    })

    dispatch({
      type: ORDERS_GET_MINE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDERS_GET_MINE_FAILURE,
      payload: error,
    })
  }
}
