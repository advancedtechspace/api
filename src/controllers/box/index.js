import { Box } from "../../models/Box/index.js";

export const home = (req, res) => {
  res.json({ app: "Box" });
};

export const create = async (req, res) => {
  const data = req.body;
  try {
    const box = await new Box({
      ...data,
      created_at: Date.now(),
      aproved: false,
    }).save();
    res.json(box);
  } catch (error) {
    console.log(error);
    res.status(409).json({});
  }
};

export const getAll = async (req, res) => {
  try {
    const boxes = await Box.find({company: req.headers.user});
    res.json(boxes);
  } catch (error) {
    console.log(error);
    res.status(409).json({});
  }
};
