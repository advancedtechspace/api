import mongoose from "mongoose";
import { env, mongoConnectionString } from "../../config/index.js";

try {
  mongoose.connect(mongoConnectionString);
} catch (error) {
  console.log("MongoDB connection error");
  console.log(error);
}

// Stock
export const Stock = mongoose.model(
  "Stock",
  new mongoose.Schema(
    {
      created_at: Date,
      created_by: String,
      quantidade: Number,
      code: {
        type: String,
        unique: true,
      }
    },
    { strict: false }
  )
);

// Categoria
export const StockCategoria = mongoose.model(
  "StockCategoria",
  new mongoose.Schema(
    {
      user: String,
      label: String,
      created_at: Date,
      created_by: String,
    },
    { strict: false }
  )
);
