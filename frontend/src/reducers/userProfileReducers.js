import {
  USER_PROFILE_FAILURE,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants'

export const getProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { ...state, isLoading: true, userProfile: null, error: null }
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userProfile: action.payload,
        error: null,
      }
    case USER_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        userProfile: null,
        error: action.payload,
      }
    default:
      return state
  }
}
export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { ...state, isLoading: true, updatedProfile: null, error: null }
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updatedProfile: action.payload,
        error: null,
      }
    case USER_UPDATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        updatedProfile: null,
        error: action.payload,
      }
    default:
      return state
  }
}
