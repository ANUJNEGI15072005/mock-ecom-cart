import express from "express";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const cart = await CartItem.find().populate("productId");
  const total = cart.reduce((sum, item) => sum + item.productId.price * item.qty, 0);
  res.json({ items: cart, total });
});

router.post("/", async (req, res) => {
  const { productId, qty } = req.body;
  const existing = await CartItem.findOne({ productId });

  if (existing) {
    existing.qty += qty;
    await existing.save();
    return res.json(existing);
  }

  const newItem = await CartItem.create({ productId, qty });
  res.json(newItem);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await CartItem.findByIdAndDelete(id);
  res.json({ message: "Item removed" });
});

router.post("/checkout", async (req, res) => {
  const { cartItems } = req.body;
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const timestamp = new Date().toISOString();

  await CartItem.deleteMany();
  res.json({ total, timestamp, message: "Mock checkout successful!" });
});

router.patch('/:id', async (req, res) => {
  try {
    const { qty } = req.body;
    const updatedItem = await CartItem.findByIdAndUpdate(
      req.params.id,
      { qty },
      { new: true }
    );
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
