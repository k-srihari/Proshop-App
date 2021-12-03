import Footer from "./Components/Footer";
import Header from "./Components/Header";
import './bootstrap.css'
import { StrictMode } from "react";

function App() {
  return (
    <StrictMode>
    <Header />
    <main>
      <h2 className="py-3 text-center">Welcome to the Pro Shop</h2>
    </main>
    <Footer />
    </StrictMode>
  );
}

export default App;