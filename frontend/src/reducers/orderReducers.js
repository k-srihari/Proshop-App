import {
  ORDERS_GET_ALL_FAILURE,
  ORDERS_GET_ALL_REQUEST,
  ORDERS_GET_ALL_SUCCESS,
  ORDERS_GET_MINE_FAILURE,
  ORDERS_GET_MINE_REQUEST,
  ORDERS_GET_MINE_SUCCESS,
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAILURE,
  ORDER_DELETE_SUCCESS,
  ORDER_DELIVERY_FAILURE,
  ORDER_DELIVERY_REQUEST,
  ORDER_DELIVERY_SUCCESS,
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
    case 'ORDER_CREATE_RESET':
      return { order: null }
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

export const getAllOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDERS_GET_ALL_REQUEST:
      return { ...state, isLoading: true }
    case ORDERS_GET_ALL_SUCCESS:
      return { ...state, isLoading: false, orders: action.payload, error: null }
    case ORDERS_GET_ALL_FAILURE:
      return { ...state, isLoading: false, orders: [], error: action.payload }
    default:
      return state
  }
}

export const orderDeliveryReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERY_REQUEST:
      return { ...state, isLoading: true }
    case ORDER_DELIVERY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        updatedOrder: action.paylaod,
        error: null,
      }
    case ORDER_DELIVERY_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        updatedOrder: null,
        error: action.payload,
      }
    default:
      return {}
  }
}

export const orderDeleteReducer = (state = { isSuccess: false }, action) => {
  if (action.type === ORDER_DELETE_SUCCESS) return { isSuccess: true }
  else if (action.type === ORDER_DELETE_FAILURE) return { isSuccess: false }
  return state
}
