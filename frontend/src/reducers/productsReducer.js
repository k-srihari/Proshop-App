import {
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAILURE,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
  IMAGE_UPLOAD_REQUEST,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_FAILURE,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FAILURE,
} from '../constants/productConstants.js'

const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCTS_LIST_REQUEST:
      return { ...state, isLoading: true }
    case PRODUCTS_LIST_SUCCESS:
      return { isLoading: false, products: action.payload.products }
    case PRODUCTS_LIST_FAILURE:
      return { isLoading: false, error: action.payload.error }
    default:
      return state
  }
}

const deleteProductReducer = (_state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_SUCCESS:
      return { isSuccess: true, error: null }
    case PRODUCT_DELETE_FAILURE:
      return { error: action.payload.message, isSuccess: false }
    default:
      return {}
  }
}

const uploadImageReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD_REQUEST:
      return { ...state, isLoading: true }
    case IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        newImagePath: action.payload,
        error: null,
      }
    case IMAGE_UPLOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        newImagePath: null,
        error: action.payload,
      }
    default:
      return {}
  }
}

export const editProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_EDIT_REQUEST:
      return { ...state, isLoading: true }
    case PRODUCT_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        newProduct: action.payload,
        error: null,
      }
    case PRODUCT_EDIT_FAILURE:
      return {
        ...state,
        isLoading: false,
        newProduct: null,
        error: action.payload.message,
      }
    default:
      return {}
  }
}

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { ...state, isLoading: true }
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product: action.payload,
        error: null,
      }
    case PRODUCT_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        product: null,
        error: action.payload,
      }
    default:
      return {}
  }
}

export { productsReducer, deleteProductReducer, uploadImageReducer }
