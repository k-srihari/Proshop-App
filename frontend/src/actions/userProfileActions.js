import axios from 'axios'
import {
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
