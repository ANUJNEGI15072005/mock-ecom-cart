import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-pink-500 shadow-lg py-3 px-10 flex justify-between items-end">
      <Link to="/" className="font-bold text-3xl text-white">Vibe Commerce</Link>
      <div className="space-x-6">
        <Link to="/" className="hover:text-pink-800 text-white text-xl">Product</Link>
        <Link to="/cart" className="hover:text-pink-800 text-white text-xl">Cart</Link>
      </div>
    </nav>
  );
}
