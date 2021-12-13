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
          </main>
          <Footer />
        </Container>
      </BrowserRouter>
    </StrictMode>
  )
}

export default App
