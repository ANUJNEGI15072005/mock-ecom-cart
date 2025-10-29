import { useState } from "react";
import api from "../api/axiosConfig";
import ReceiptModal from "../components/ReceiptModal";

export default function Checkout() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.get("/cart");
    const { items } = res.data;
    const receiptRes = await api.post("/cart/checkout", { cartItems: items.map(i => ({
      price: i.productId.price,
      qty: i.qty
    })) });
    setReceipt(receiptRes.data);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Place Order
        </button>
      </form>

      {receipt && <ReceiptModal receipt={receipt} />}
    </div>
  );
}
