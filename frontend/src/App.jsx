import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
}
