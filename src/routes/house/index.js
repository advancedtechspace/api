import express from "express";
import {
  create,
  getAll,
  getAllAdmin,
  getById,
  home,
  remove,
  update,
} from "../../controllers/house/index.js";

const router = express.Router();

router.get("/", home);
router.get("/all", getAll);
router.get("/all-admin", getAllAdmin);
router.post("/create", create);
router.get("/:id", getById);
router.put("/update", update);
router.delete("/remove", remove);

export default router;
