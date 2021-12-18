import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import productsReducer from './reducers/productsReducer.js'
import productDetailsReducer from './reducers/productDetailsReducer'
import cartReducer from './reducers/cartReducer.js'
import {
  userAuthenticationReducer,
  userRegistrationReducer,
} from './reducers/userAuthenticationReducer.js'
import {
  getProfileReducer,
  updateProfileReducer,
} from './reducers/userProfileReducers.js'
import {
  createOrderReducer,
  orderDetailsReducer,
} from './reducers/orderReducers.js'

const reducer = combineReducers({
  productsReducer,
  productDetailsReducer,
  cartReducer,
  userAuthenticationReducer,
  userRegistrationReducer,
  getProfileReducer,
  updateProfileReducer,
  createOrderReducer,
  orderDetailsReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : null

const initialState = {
  cartReducer: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userAuthenticationReducer: {
    userInfo: userInfoFromStorage,
  },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
