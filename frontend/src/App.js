import './bootstrap.css'
import { StrictMode } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from './Screens/ProductScreen';
import LoginScreen from './Screens/LoginScreen';
import CartScreen from './Screens/CartScreen';

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Container>
          <Header />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/cart" component={CartScreen} />
          <Footer />
        </Container>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;