import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const navigate = useNavigate();

  const loadCart = async () => {
    const res = await api.get("/cart");
    setCart(res.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (id) => {
    await api.delete(`/cart/${id}`);
    loadCart();
  };

  const updateQuantity = async (id, qty) => {
    if (qty <= 0) return;
    await api.patch(`/cart/${id}`, { qty });
    loadCart();
  };

  if (!cart.items.length)
    return <p className="text-center mt-10 text-lg">Your cart is empty </p>;

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Cart</h2>

      <div className="space-y-4">
        {cart.items.map((item) => (
          <div
            key={item._id}
            className="flex flex-wrap justify-between items-center border-b pb-3"
          >
            <div className="w-1/3 min-w-[150px]">
              <p className="font-medium">{item.productId.name}</p>
              <p className="text-sm text-gray-500">₹{item.productId.price}</p>
            </div>

            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
              <button
                onClick={() => updateQuantity(item._id, item.qty - 1)}
                className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 text-lg font-semibold"
              >
                −
              </button>
              <span className="w-6 text-center font-medium">{item.qty}</span>
              <button
                onClick={() => updateQuantity(item._id, item.qty + 1)}
                className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 text-lg font-semibold"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-4">
              <p className="font-medium">₹{item.productId.price * item.qty}</p>
              <button
                onClick={() => removeItem(item._id)}
                className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between text-lg font-semibold">
        <p>Total:</p>
        <p>₹{cart.total}</p>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/checkout")}
          className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
