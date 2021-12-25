import axios from 'axios'
import {
  IMAGE_UPLOAD_FAILURE,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  PRODUCT_CREATE_FAILURE,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_EDIT_FAILURE,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
} from '../constants/productConstants'
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
          'Content-Type': 'application/json',
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

export const deleteProductAction = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${
          getState().userAuthenticationReducer.userInfo.token
        }`,
      },
    })
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAILURE,
      payload: error,
    })
  }
}

export const editProductAction = (id, body) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_EDIT_REQUEST,
  })
  try {
    const { data } = await axios.put(`/api/products/${id}`, body, {
      headers: {
        Authorization: `Bearer ${
          getState().userAuthenticationReducer.userInfo.token
        }`,
        'Content-Type': 'application/json',
      },
    })
    dispatch({
      type: PRODUCT_EDIT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_EDIT_FAILURE,
      payload: error,
    })
  }
}

export const imageUploadAction = (file) => async (dispatch, getState) => {
  dispatch({
    type: IMAGE_UPLOAD_REQUEST,
  })
  try {
    const formData = new FormData()
    formData.append('picture', file)

    const { data } = await axios.post('/api/products/upload-image', formData, {
      headers: {
        Authorization: `Bearer ${
          getState().userAuthenticationReducer.userInfo.token
        }`,
        'Content-Type': 'multipart/form-data',
      },
    })
    dispatch({
      type: IMAGE_UPLOAD_SUCCESS,
      payload: data.filePath,
    })
  } catch (error) {
    dispatch({
      type: IMAGE_UPLOAD_FAILURE,
      payload: error.message,
    })
  }
}

export const createProductAction =
  (productDetails) => async (dispatch, getState) => {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    })
    try {
      const { data } = await axios.post('/api/products', productDetails, {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' + getState().userAuthenticationReducer.userInfo.token,
        },
      })
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAILURE,
        payload: error,
      })
    }
  }
