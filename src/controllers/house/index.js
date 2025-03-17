import { House } from "../../models/cronus/House.js";
import { User } from "../../services/mongoose/index.js";

export const home = (req, res) => {
  res.json({ app: "House" });
};

export const create = async (req, res) => {
  const data = req.body;
  try {
    const house = await new House({
      ...data,
      created_at: Date.now(),
      user: req.headers.user,
      removed: false
    }).save();
    res.json(house);
  } catch (error) {
    console.log(error);
    res.status(409).json({});
  }
};

export const getAll = async (req, res) => {
  try {
    const houses = await House.find({available: true, removed: false});
    const arrCont = []
    for (let i = 0; i < houses.length; i++) {
      const h = houses[i];
      const u = await User.findOne({_id: h.user});  
      arrCont[i] = {...h, tel: u.tel}
    }

    res.json(arrCont);
  } catch (error) {
    console.log(error);
    res.status(409).json({});
  }
};

export const getAllAdmin = async (req, res) => {
  try {
    const houses = await House.find({user: req.headers.user, removed: false});
    res.json(houses);
  } catch (error) {
    console.log(error);
    res.status(409).json({});
  }
};

export const getById = async (req, res) => {
  try {
    const data = await House.findOne({ _id: req.params.id });
    res.json(data);
  } catch (error) {
    res.status(409).json({});
  }
};

export const update = async (req, res) => {
  const _id = req.headers.item;

  const updated = await House.findOneAndUpdate({ _id }, req.body, {
    new: true,
  });
  res.json(updated);
};

export const remove = async (req, res) => {
  const _id = req.headers.item;

  const updated = await House.findOneAndUpdate({ _id }, {removed: true}, {
    new: true,
  });
  res.json(updated);
};
