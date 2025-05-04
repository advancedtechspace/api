import { Asset } from "../../models/cronus/asset.js";
import { Stock, StockCategoria } from "../../models/cronus/stock.js";
import crypto from 'crypto';

export const getStock = async (req, res) => {
  const user = req.headers.user;

  try {
    const stock = await Stock.find({ user }).sort({ desc: 1 });
    res.json(stock);
  } catch (error) {
    console.log(error);
    res.status(409).json({});
  }
};

export const getTotalStock = async (req, res) => {
  const user = req.headers.user;

  try {
    const stock = await Stock.find({ user }).sort({ desc: 1 });
    let total = 0;

    for (const s of stock) {
      if (s.tipo === "0") {
        total += parseFloat(s.valor) || 0;
      }
    }

    res.json({ total });
  } catch (error) {
    console.log(error);
    res.status(409).json({});
  }
};

export const createStock = async (req, res) => {
  const data = req.body;
  const user = req.headers.user;

  const digits = "0123456789".split("");
  let code = "";

  for (let i = 0; i < 8; i++) {
    const index = crypto.randomInt(0, digits.length);
    code += digits[index];
    digits.splice(index, 1);
  }

  data.code = code;

  try {
    const stock = await new Stock({ ...data, user }).save();
    res.json(Stock);
  } catch (error) {
    console.log(error);
    res.status(409).json({});
  }
};

export const updateStock = async (req, res) => {
  const stock = req.headers.stock;

  try {
    const data = await Stock.findOneAndUpdate({ _id: stock }, req.body, {
      new: true,
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(409).json({});
  }
};

export const createStockCategoria = async (req, res) => {
  const data = req.body;
  const user = req.headers.user;

  try {
    const categoria = await new StockCategoria({ ...data, user }).save();
    res.json(categoria);
  } catch (error) {
    console.log(error);
    res.status(409).json({});
  }
};

export const getStockCategoria = async (req, res) => {
  const user = req.headers.user;

  try {
    const stock = await StockCategoria.find({ user });
    res.json(stock);
  } catch (error) {
    console.log(error);
    res.status(409).json({});
  }
};

export const getTotalStockServices = async (req, res) => {
  const user = req.headers.user;

  const stock = (await Stock.find({ user, tipo: "0" })).filter(
    ({ removed }) => !removed
  );
  const asset = (await Asset.find({ user, tipo: "0" })).filter(
    ({ removed }) => !removed
  );

  let s_total = 0;
  let a_total = 0;

  for (const s of stock) {
    s_total += (parseFloat(s.valor) || 0) * (parseInt(s.quantidade) || 0);
  }

  for (const a of asset) {
    a_total += parseFloat(a.valor) || 0;
  }

  res.json({ total: s_total + a_total });
};
