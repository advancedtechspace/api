import { PastaEvidencia } from "../../models/pasta-evidencia/index.js";

export const create = async (req, res) => {
  const data = req.body;
  const user = req.headers.user;

  try {
    const pasta = await new PastaEvidencia({
      ...data,
      user,
      created_at: Date.now(),
    }).save();
    res.json(pasta);
  } catch (error) {
    console.log(error);
    res.status(409).json({});
  }
};

export const all = async (req, res) => {
  const data = await PastaEvidencia.find().sort({ date: -1 });
  res.json(data);
};
