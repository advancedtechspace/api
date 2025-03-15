import express from "express";
import { create, getAll, home } from "../../controllers/box/index.js";

const router = express.Router();

router.get("/", home);
router.get("/all", getAll);
router.post("/create", create);

export default router;
