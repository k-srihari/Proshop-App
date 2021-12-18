import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from '../constants/orderConstants'

export const createOrderReducer = (state = { order: null }, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, isLoading: true }
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order: action.payload,
        error: null,
      }
    case ORDER_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        order: null,
        error: action.payload.message,
      }
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { isLoading: true, order: null },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, isLoading: true }
    case ORDER_DETAILS_SUCCESS:
      return { ...state, isLoading: false, order: action.payload, error: null }
    case ORDER_DETAILS_FAILURE:
      return { ...state, isLoading: false, order: null, error: action.payload }
    default:
      return state
  }
}
