import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import productsReducer from './reducers/productsReducer.js'
import productDetailsReducer from './reducers/productDetailsReducer'
import cartReducer from './reducers/cartReducer.js'

const reducer = combineReducers({
  productsReducer,
  productDetailsReducer,
  cartReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const initialState = {
  cartReducer: {
    cartItems: cartItemsFromStorage,
  },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
