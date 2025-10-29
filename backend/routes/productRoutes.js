import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length === 0) {
      const mockProducts = [
        { name: "Golden Earrings", price: 499, image: "https://smarsjewelry.com/cdn/shop/files/1603.1.jpg?v=1739606564" },
        { name: "Silver Necklace", price: 799, image: "https://karizmajewels.in/cdn/shop/files/chainm124.jpg?v=1726048896" },
        { name: "Bracelet Set", price: 699, image: "https://nolabels.in/cdn/shop/files/B1.jpg?v=1699449095&width=1080" },
        { name: "Classic Ring", price: 299, image: "https://m.media-amazon.com/images/I/911ZiGRTVsL._AC_UY300_.jpg" },
      ];
      await Product.insertMany(mockProducts);
      return res.json(await Product.find());
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

export default router;
