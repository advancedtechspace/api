import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ info: "Welcome to automata 👌!" });
});

export default router;
