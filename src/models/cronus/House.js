import mongoose from "mongoose";
import { env, mongoConnectionString } from "../../config/index.js";

try {
  mongoose.connect(mongoConnectionString);
} catch (error) {
  console.log("MongoDB connection error");
  console.log(error);
}

// House
export const House = mongoose.model(
  "House",
  new mongoose.Schema(
    {
      created_at: Date,
      created_by: String
    },
    { strict: false }
  )
);