import axios from 'axios'
import {
  USERS_GET_ALL_FAILURE,
  USERS_GET_ALL_REQUEST,
  USERS_GET_ALL_SUCCESS,
  USER_DELETE_FAILURE,
  USER_DELETE_SUCCESS,
  USER_EDIT_FAILURE,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_GET_FAILURE,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
} from '../constants/userConstants'

export const getAllUsersAction = () => async (dispatch, getState) => {
  dispatch({ type: USERS_GET_ALL_REQUEST })

  try {
    const { data } = await axios.get('/api/users/all', {
      headers: {
        Authorization: `Bearer ${
          getState().userAuthenticationReducer.userInfo.token
        }`,
      },
    })
    dispatch({
      type: USERS_GET_ALL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USERS_GET_ALL_FAILURE,
      payload: error,
    })
  }
}

export const deleteUserAction = (userID) => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/users/${userID}`, {
      headers: {
        Authorization: `Bearer ${
          getState().userAuthenticationReducer.userInfo.token
        }`,
      },
    })
    dispatch({
      type: USER_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAILURE,
      payload: error,
    })
  }
}

export const getUserAction = (userID) => async (dispatch, getState) => {
  dispatch({
    type: USER_GET_REQUEST,
  })

  try {
    const { data } = await axios.get(`/api/users/${userID}`, {
      headers: {
        Authorization: `Bearer ${
          getState().userAuthenticationReducer.userInfo.token
        }`,
      },
    })
    dispatch({
      type: USER_GET_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_GET_FAILURE,
      payload: error,
    })
  }
}

export const editUserAction =
  (userID, reqBody) => async (dispatch, getState) => {
    dispatch({
      type: USER_EDIT_REQUEST,
    })

    try {
      const { data } = await axios.put(`/api/users/${userID}`, reqBody, {
        headers: {
          Authorization: `Bearer ${
            getState().userAuthenticationReducer.userInfo.token
          }`,
        },
      })
      dispatch({
        type: USER_EDIT_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: USER_EDIT_FAILURE,
        payload: error,
      })
    }
  }
