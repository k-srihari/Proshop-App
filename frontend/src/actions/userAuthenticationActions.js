import axios from 'axios'
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
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

export { userLoginAction, userLogoutAction }
