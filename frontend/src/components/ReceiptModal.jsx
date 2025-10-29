import { useNavigate } from "react-router-dom";

export default function ReceiptModal({ receipt }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h3 className="text-xl font-semibold mb-2">Order Successful 🎉</h3>
        <p>Total: ₹{receipt.total}</p>
        <p className="text-sm text-gray-500 mt-2">
          {new Date(receipt.timestamp).toLocaleString()}
        </p>
        <p className="mt-3 text-green-600 font-medium">{receipt.message}</p>

        <button
          onClick={() => navigate("/cart")}
          className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          OK
        </button>
      </div>
    </div>
  );
}
