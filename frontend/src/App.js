import './bootstrap.css'
import { StrictMode } from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen'
import LoginScreen from './Screens/LoginScreen'
import CartScreen from './Screens/CartScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ProfileScreen from './Screens/ProfileScreen'
import ShippingScreen from './Screens/ShippingScreen'
import PaymentScreen from './Screens/PaymentScreen'
import PlaceOrderScreen from './Screens/PlaceOrderScreen'
import OrderDetailsScreen from './Screens/OrderDetailsScreen'
import UsersListScreen from './Screens/UsersListScreen'
import UserEditScreen from './Screens/UserEditScreen'
import ProductsListScreen from './Screens/ProductsListScreen'
import ProductEditScreen from './Screens/ProductEditScreen'
import ProductCreateScreen from './Screens/ProductCreateScreen'
import OrdersListScreen from './Screens/OrdersListScreen'

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Container>
          <Header />
          <main>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/products/:id" component={ProductScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/checkout" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/place-order" component={PlaceOrderScreen} />
            <Route path="/orders/:id" component={OrderDetailsScreen} />
            <Route path="/admin/users/all" component={UsersListScreen} />
            <Route path="/admin/users/:id/edit" component={UserEditScreen} />
            <Route path="/admin/products/all" component={ProductsListScreen} />
            <Route
              path="/admin/products/:id/edit"
              component={ProductEditScreen}
            />
            <Route
              path="/admin/products/add-new"
              component={ProductCreateScreen}
            />
            <Route path="/admin/orders/all" component={OrdersListScreen} />
          </main>
          <Footer />
        </Container>
      </BrowserRouter>
    </StrictMode>
  )
}

export default App
