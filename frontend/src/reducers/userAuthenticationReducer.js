import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants'

const userAuthenticationReducer = (state = {}, action) => {
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

const userRegistrationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, isLoading: true, newUser: null, error: null }
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        newUser: action.payload,
        error: null,
      }
    case USER_REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        newUser: null,
        error: action.payload.error,
      }
    default:
      return state
  }
}

export { userAuthenticationReducer, userRegistrationReducer }
