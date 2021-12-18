import axios from 'axios'
import {
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
  USER_PROFILE_FAILURE,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants'

export const getUserProfile = () => async (dispatch, getState) => {
  dispatch({
    type: USER_PROFILE_REQUEST,
  })

  try {
    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: (
        await axios.get('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${
              getState().userAuthenticationReducer.userInfo.token
            }`,
          },
        })
      ).data,
    })
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAILURE,
      payload: error,
    })
  }
}

export const updateUserProfile =
  (name, email, password) => async (dispatch, getState) => {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })

    try {
      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: (
          await axios.put(
            'api/users/profile',
            { name, email, password },
            {
              headers: {
                Authorization: `Bearer ${
                  getState().userAuthenticationReducer.userInfo.token
                }`,
              },
            }
          )
        ).data,
      })
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAILURE,
        payload: error,
      })
    }
  }

export const saveShippingAddress = (fullAddress) => (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_ADDRESS,
    payload: fullAddress,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(fullAddress))
}

export const savePaymentMethod = (paymentMethod) => (dispatch) => {
  dispatch({
    type: SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  })
}
