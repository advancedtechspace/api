import express from "express";

import { removeItem } from "../../controllers/cronus/index.js";
import {
  createStaff,
  createStaffCategoria,
  getStaff,
  getStaffCategoria,
  updateStaff,
} from "../../controllers/cronus/Staff.js";

import {
  createClient,
  createClientCategoria,
  getClient,
  getClientCategoria,
  updateClient,
} from "../../controllers/cronus/Client.js";

import { createCredito, getCredito } from "../../controllers/cronus/Credito.js";
import {
  createStock,
  getStock,
  createStockCategoria,
  getStockCategoria,
  getTotalStockServices,
  updateStock,
} from "../../controllers/cronus/Stock.js";
import {
  createAsset,
  createAssetCategoria,
  getAsset,
  getAssetCategoria,
  updateAsset,
} from "../../controllers/cronus/Asset.js";
import {
  createSell,
  getSales,
  getSalesPerMonth,
  getSalesPerStock,
} from "../../controllers/cronus/Sell.js";

const router = express.Router();

router.get("/", (req, res) => res.json({ app: "CRONUS" }));

// Remove
router.delete("/remove", removeItem);

// Staff
router.get("/staff/", getStaff);
router.post("/staff/create", createStaff);
router.put("/staff/update", updateStaff);
router.post("/staff/categoria/create", createStaffCategoria);
router.get("/staff/categoria/", getStaffCategoria);

// Client
router.get("/client/", getClient);
router.post("/client/create", createClient);
router.put("/client/update", updateClient);
router.post("/client/categoria/create", createClientCategoria);
router.get("/client/categoria/", getClientCategoria);

// Credito
router.get("/credito/", getCredito);
router.post("/credito/create", createCredito);

// Stock
router.get("/stock/", getStock);
router.post("/stock/create", createStock);
router.put("/stock/update", updateStock);
router.post("/stock/categoria/create", createStockCategoria);
router.get("/stock/categoria/", getStockCategoria);
router.get("/stock/total-stock-servicos", getTotalStockServices);

// Asset
router.get("/asset/", getAsset);
router.post("/asset/create", createAsset);
router.post("/asset/categoria/create", createAssetCategoria);
router.get("/asset/categoria/", getAssetCategoria);
router.put("/asset/update", updateAsset);

// Sales
router.get("/sales/", getSales);
router.get("/sales/per-month/:year", getSalesPerMonth);
router.get("/sales/per-stock", getSalesPerStock);
router.post("/sales/create", createSell);

export default router;
