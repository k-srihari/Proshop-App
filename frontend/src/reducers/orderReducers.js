import {
  ORDERS_GET_MINE_FAILURE,
  ORDERS_GET_MINE_REQUEST,
  ORDERS_GET_MINE_SUCCESS,
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAYMENT_FAILURE,
  ORDER_PAYMENT_REQUEST,
  ORDER_PAYMENT_RESET,
  ORDER_PAYMENT_SUCCESS,
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

export const orderPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAYMENT_REQUEST:
      return { isLoading: true, isSuccess: false }
    case ORDER_PAYMENT_SUCCESS:
      return { isLoading: false, isSuccess: true, updatedOrder: action.payload }
    case ORDER_PAYMENT_FAILURE:
      return {
        isLoading: false,
        isSuccess: false,
        error: action.payload.message,
      }
    case ORDER_PAYMENT_RESET:
      return {}
    default:
      return state
  }
}

export const getUserOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDERS_GET_MINE_REQUEST:
      return { ...state, isLoading: true }
    case ORDERS_GET_MINE_SUCCESS:
      return { ...state, isLoading: false, orders: action.payload }
    case ORDERS_GET_MINE_FAILURE:
      return { ...state, isLoading: false, orders: [], error: action.payload }
    default:
      return state
  }
}
