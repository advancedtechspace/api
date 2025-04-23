import express from "express";
import { create, all } from "../../controllers/pasta-evidencia/index.js";

const router = express.Router();

router.get("/", (req, res) => res.json({ App: "Pasta-evidencias" }));
router.get("/all", all);
router.post("/create", create);

export default router;
