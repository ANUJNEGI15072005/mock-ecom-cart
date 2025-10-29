import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
