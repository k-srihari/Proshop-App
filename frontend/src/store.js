import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import productsReducer from './reducers/productsReducer.js'
import productDetailsReducer from './reducers/productDetailsReducer'
import cartReducer from './reducers/cartReducer.js'
import userAuthenticationReducer from './reducers/userAuthenticationReducer.js'

const reducer = combineReducers({
  productsReducer,
  productDetailsReducer,
  cartReducer,
  userAuthenticationReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  cartReducer: {
    cartItems: cartItemsFromStorage,
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
