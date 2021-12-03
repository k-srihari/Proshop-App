import Footer from "./Components/Footer";
import Header from "./Components/Header";
import './bootstrap.css'
import { StrictMode } from "react";
import HomeScreen from "./Screens/HomeScreen";
import { Container } from "react-bootstrap";

function App() {
  return (
    <StrictMode>
    <Header />
    <main className="py-3">
      <Container>
        <HomeScreen />
      </Container>
    </main>
    <Footer />
    </StrictMode>
  );
}

export default App;