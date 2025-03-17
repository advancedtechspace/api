import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";

// IMPORT ROUTES
import main from "./main/index.js";
import automata from "./automata/index.js";
import user from "./user/index.js";
import machina from "./machina/index.js";
import chatbot from "./chatbot/index.js";
import cronus from "./cronus/index.js";
import ats from "./ats/index.js";
import panel from "./panel/index.js";
import box from "./box/index.js";
import house from "./house/index.js";

// EXPRESS CONFIG.
const app = express();
app.use(cookieParser());
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "3mb" }));
app.use(express.static("static"));
const server = http.createServer(app);

// USE ROUTES
app.use("/", main);
app.use("/user", user);
app.use("/automata", automata);
app.use("/machina", machina);
app.use("/chatbot", chatbot);
app.use("/cronus", cronus);
app.use("/ats", ats);
app.use("/panel", panel);
app.use("/box", box);
app.use("/house", house);

export default server;
