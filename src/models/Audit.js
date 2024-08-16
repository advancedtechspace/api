import mongoose from "mongoose";
import { env, mongoConnectionString } from "../config/index.js";

try {
  mongoose.connect(mongoConnectionString);
} catch (error) {
  console.log("MongoDB connection error");
  console.log(error);
}

export const Audit = mongoose.model(
  "Audit",
  new mongoose.Schema(
    {
      created_at: Date,
      created_by: String,
      app: String,
    },
    { strict: false }
  )
);