import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../constants/userConstants'

const userAuthenticationReducer = (state = null, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, isLoading: true, userInfo: null, error: null }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: action.payload,
        error: null,
      }
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        userInfo: null,
        error: action.payload.error,
      }
    case USER_LOGOUT:
      return { ...state, userInfo: null }
    default:
      return state
  }
}

export default userAuthenticationReducer
