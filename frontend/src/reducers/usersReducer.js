import {
  USERS_GET_ALL_FAILURE,
  USERS_GET_ALL_REQUEST,
  USERS_GET_ALL_SUCCESS,
  USER_DELETE_FAILURE,
  USER_DELETE_SUCCESS,
  USER_EDIT_FAILURE,
  USER_EDIT_REQUEST,
  USER_EDIT_RESET,
  USER_EDIT_SUCCESS,
  USER_GET_FAILURE,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
} from '../constants/userConstants'

const getAllUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USERS_GET_ALL_REQUEST:
      return { ...state, isLoading: true }
    case USERS_GET_ALL_SUCCESS:
      return { ...state, isLoading: false, users: action.payload, error: null }
    case USERS_GET_ALL_FAILURE:
      return { ...state, isLoading: false, users: [], error: action.payload }
    default:
      return state
  }
}

const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_SUCCESS:
      return { isSuccess: true, error: null }
    case USER_DELETE_FAILURE:
      return { isSuccess: false, error: action.payload.message }
    default:
      return state
  }
}

const getUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GET_REQUEST:
      return { ...state, isLoading: true }
    case USER_GET_SUCCESS:
      return { ...state, isLoading: false, user: action.payload, error: null }
    case USER_GET_FAILURE:
      return { ...state, isLoading: false, error: action.payload, user: null }
    default:
      return state
  }
}

const editUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EDIT_REQUEST:
      return { ...state, isLoading: true }
    case USER_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null,
        isSuccess: true,
      }
    case USER_EDIT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        user: null,
        isSuccess: false,
      }
    case USER_EDIT_RESET:
      return {}
    default:
      return state
  }
}

export {
  getAllUsersReducer,
  deleteUserReducer,
  getUserReducer,
  editUserReducer,
}
