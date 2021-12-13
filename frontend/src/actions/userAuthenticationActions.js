import axios from 'axios'
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants'

const userLoginAction = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  })

  try {
    const { data } = await axios.post(
      '/api/users/login',
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: { error: error.message },
    })
  }
}

const userLogoutAction = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  })

  localStorage.removeItem('userInfo')
}

const userRegisterAction = (name, email, password) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
  })

  try {
    const { data } = await axios.post(
      '/api/users/register',
      {
        name,
        email,
        password,
      },
      {
        headers: {
          'Content-type': 'application/json',
        },
      }
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload: { error },
    })
  }
}

export { userLoginAction, userLogoutAction, userRegisterAction }
