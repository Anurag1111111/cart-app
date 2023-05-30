import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Routes>
          <Route exact path="/cart-app" element={<Home />} />

          <Route exact path="/cart" element={<Cart />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
