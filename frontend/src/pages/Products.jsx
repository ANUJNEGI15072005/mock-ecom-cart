import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
    setLoading(false);
  };

  const fetchCart = async () => {
    const res = await api.get("/cart");
    const ids = res.data.items.map((item) => item.productId._id);
    setCartItems(ids);
  };

  const addToCart = async (productId) => {
    if (cartItems.includes(productId)) return;
    await api.post("/cart", { productId, qty: 1 });
    await fetchCart();
  };

  useEffect(() => {
    const init = async () => {
      await fetchProducts();
      await fetchCart();
    };
    init();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Shop Our Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p._id} className="border rounded-lg p-4 text-center shadow-md">
            <img
              src={p.image}
              alt={p.name}
              className="mx-auto mb-2 w-24 h-24 object-cover rounded"
            />
            <h3 className="font-medium">{p.name}</h3>
            <p className="text-gray-700">₹{p.price}</p>
            {cartItems.includes(p._id) ? (
              <button
                disabled
                className="mt-2 bg-gray-400 text-white px-3 py-1 rounded cursor-not-allowed"
              >
                Already in Cart
              </button>
            ) : (
              <button
                onClick={() => addToCart(p._id)}
                className="mt-2 bg-pink-400 text-white px-3 py-1 rounded hover:bg-pink-500"
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
