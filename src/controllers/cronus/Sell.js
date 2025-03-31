import { Sell } from "../../models/cronus/Sell.js";
import { Stock } from "../../models/cronus/stock.js";

export const createSell = async (req, res) => {
  const data = req.body;
  const user = req.headers.user;

  try {
    const sell = await new Sell({
      cart: data.cart,
      bi: data.bi,
      created_at: new Date(),
      user,
    }).save();
    res.json(sell);
  } catch (error) {
    console.log(error);
    res.status(409).json({});
  }
};

export const getSales = async (req, res) => {
  const user = req.headers.user;

  try {
    const sales = await Sell.find({ user }).sort({ created_at: -1 });

    res.json(sales);
  } catch (error) {
    console.log(error);
    res.status(409).json({});
  }
};

export const getSalesPerMonth = async (req, res) => {
  const user = req.headers.user;
  const year = req.params.year;

  try {

    const stock = await Stock.find({ user });
    const sales = await Sell.find({
      created_at: {
        $gte: new Date(`${year}-01-01`),
        $lt: new Date(`${year + 1}-01-01`),
      },
      user,
    });

    const meses = new Array(12);

    for (let i = 0; i < meses.length; i++) {
      meses[i] = 0;
    }

    for (const s of sales) {
      for (const p of s.cart) {
        const { valor } = stock.find(({ _id }) => _id == p.product);
        const pd = { ...p, valor };
        const mes = new Date(s.created_at).getMonth();
        meses[mes] += parseFloat(pd.quantidade) * parseFloat(valor);
      }
    }

    res.json(meses);
  } catch (error) {
    console.log(error);
    res.status(409).json({});
  }
};

export const getSalesPerStock = async (req, res) => {
  const user = req.headers.user;

  let stock = await Stock.find({ user }).sort({desc: 1});
  const sales = await Sell.find({ user });

  stock = stock.map(
    ({ desc, valor, quantidade, _id, categoria, tipo, user }) => ({
      desc,
      valor,
      quantidade,
      _id,
      categoria,
      tipo,
      user,
      sales: 0,
    })
  );

  const carts = sales.map(({ cart }) => cart);

  for (let i = 0; i < stock.length; i++) {
    for (let j = 0; j < carts.length; j++) {
      for (const p of carts[j]) {
        if (stock[i]._id == p.product) {
          stock[i].sales += parseFloat(p.quantidade);
        }
      }
    }
  }
 
  res.json(stock);
};
