import express from "express";
import {
  getDistritos,
  getBairros,
  home,
  bairros,
  getMusics,
  getResource,
} from "../../controllers/main/index.js";
import sendMail from "../../services/nodemailer/send_mail.js";

const router = express.Router();

router.get("/", home);
router.get("/cron", async (req, res) => {
  sendMail(
    "sairessy@gmail.com",
    "Cron",
    `Hello, it is ${new Date().toLocaleDateString(
      "en-GB"
    )}, it comes from ${req.get("host")}.`
  );
  res.json({});
});
router.get("/maputo/bairros/:distrito", getBairros);
router.get("/maputo/distritos", getDistritos);
router.get("/maputo/bairros", bairros);

// Musics for CRONUS
router.get("/musics", getMusics);

// Third part API's resources
router.post("/resource", getResource);

export default router;
