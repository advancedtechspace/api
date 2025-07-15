import { Sell } from "../../models/cronus/Sell.js";
import { Stock } from "../../models/cronus/stock.js";
import htmlPdf from "html-pdf";
import { User } from "../../services/mongoose/index.js";
import { api_url } from "../../config/index.js";

export const createSell = async (req, res) => {
  const data = req.body;
  const user = req.headers.user;

  // for (const c of data.cart) {
  //   await Stock.findOneAndUpdate(
  //     { _id: c.product },
  //     { $inc: { quantidade: -1 * parseFloat(c.quantidade) } },
  //     data,
  //     {
  //       new: true,
  //     }
  //   );
  // }

  try {
    const sell = await new Sell({
      cart: data.cart,
      valor_total: data.valor_total,
      bi: data.bi,
      created_at: new Date(),
      user,
    }).save();

    const user_details = await User.findById({ _id: user });

    let rows = new String();

    for (const p of data.cart) {
      const preco = parseFloat(p.product_label.split("(")[1].split(" ")[0]);
      const subtotal = preco * parseFloat(p.quantidade);
      rows += `<tr>
      <td style='padding: 20px;'>${p.product_label}</td>
      <td style='padding: 20px;'>${p.quantidade}</td>
      <td style='padding: 20px;'>${subtotal}</td>
    </tr>`;
    }

    //
    const primary_color = "indigo";

    const date = new Date();

    const formatador = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const dataFormatada = formatador.format(date);

    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Factura</title>
    </head>
    
    <body style='font-family: arial; padding: 50px; box-sizing: content-box;'>
      <div style='text-align: center; background: ${primary_color}; color: #fff; padding: 10px'>
        <h1>${user_details.name}</h1>
        <p>${user_details.localizacao} - ${user_details.tel}</p>
      </div>
      <div style='padding: 20px;'>
        <h1 style='font-size: 48px;'>Factura</h1>
        <p><b>ID: </b>${sell._id}</p>
        <p><b>Data: </b>${dataFormatada}</p>
      </div>
      <table width='100%'>
        <thead style='background: ${primary_color}; color: #fff;'>
          <th style='padding: 20px;'>Producto</th>
          <th style='padding: 20px;'>Qtd.</th>
          <th style='padding: 20px;'>Subtotal</th>
        </thead>
        <tbody>
          <trows>
            ${rows}
          <trows>
        </tbody>
      </table>
      <h2 style='background: ${primary_color}; color: #fff; padding: 5px; width: 40%;'>Total: ${data.valor_total} MT</h2>
      <footer style='position: absolute; bottom: 20px; width: 100%; right: 70px;'>
        <p style='text-align: right;'>
          <!--Powered by <span style='color: ${primary_color}'>
          <b>${user_details.name}</span></b>-->
        </p>
      </footer>
    </body>
    </html>`;

    htmlPdf
      .create(html, {})
      .toFile(`./static/cronus-facturas/${sell._id}.pdf`, function (err, res) {
        if (err) return console.log(err);
        console.log(res);
      });

    //

    res.json(sell);
  } catch (error) {
    console.log(error);
    res.status(409).json({});
  }
};

export const getFactura = async (req, res) => {
  const id = req.params.id;
  const user = req.query.u;

  try {

    const user_details = await User.findById({ _id: user });
    const data = await Sell.findById({ _id: id });

    let rows = new String();

    for (const p of data.cart) {
      const preco = parseFloat(p.product_label.split("(")[1].split(" ")[0]);
      const subtotal = preco * parseFloat(p.quantidade);
      rows += `<tr>
      <td style='padding: 20px;'>${p.product_label}</td>
      <td style='padding: 20px;'>${p.quantidade}</td>
      <td style='padding: 20px;'>${subtotal}</td>
    </tr>`;
    }

    //
    const primary_color = "indigo";

    const date = data.created_at;

    const formatador = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const dataFormatada = formatador.format(date);

    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Factura</title>
    </head>
    
    <body style='font-family: arial; padding: 50px; box-sizing: content-box;'>
      <div style='text-align: center; background: ${primary_color}; color: #fff; padding: 10px'>
        <h1>${user_details.name}</h1>
        <p>${user_details.localizacao} - ${user_details.tel}</p>
      </div>
      <div style='padding: 20px;'>
        <h1 style='font-size: 48px;'>Factura</h1>
        <p><b>ID: </b>${id}</p>
        <p><b>Data: </b>${dataFormatada}</p>
      </div>
      <table width='100%'>
        <thead style='background: ${primary_color}; color: #fff;'>
          <th style='padding: 20px;'>Producto</th>
          <th style='padding: 20px;'>Qtd.</th>
          <th style='padding: 20px;'>Subtotal</th>
        </thead>
        <tbody>
          <trows>
            ${rows}
          <trows>
        </tbody>
      </table>
      <h2 style='background: ${primary_color}; color: #fff; padding: 5px; width: 40%;'>Total: ${data.valor_total} MT</h2>
      <footer style='position: absolute; bottom: 20px; width: 100%; right: 70px;'>
        <p style='text-align: right;'>
          <!--Powered by <span style='color: ${primary_color}'>
          <b>${user_details.name}</span></b>-->
        </p>
      </footer>
    </body>
    </html>`;

    htmlPdf
      .create(html, {})
      .toFile(`./static/cronus-facturas/${id}.pdf`, function (err, res) {
        if (err) return console.log(err);
        console.log(res);
      });

      res.redirect(`${api_url}/cronus-facturas/${id}.pdf`);
  } catch (error) {
    console.log(error);
    res.status(409).json({error});
  }
}

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

  let stock = await Stock.find({ user }).sort({ desc: 1 });
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
