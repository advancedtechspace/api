import dotenv from "dotenv";
import crypto from "crypto";

import { fileURLToPath } from "url";
import path from "path";

export const env = process.env.EMAIL ? process.env : dotenv.config().parsed;
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const hash = (data) => {
  return crypto.createHash("sha256").update(data).digest("hex");
};

export const mongoConnectionString = env.LOCAL
  ? "mongodb://127.0.0.1:27017/test"
  : `mongodb+srv://sairessy:${env.MONGO_PASS}@cluster0.bpljm3t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export const api_url = env.LOCAL
  ? "http://localhost:8000"
  : "api.advancedtechspace.com";
