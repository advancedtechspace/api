import { User } from "../../services/mongoose/index.js";
import sendMail from "../../services/nodemailer/send_mail.js";
import { hash } from "../../config/index.js";
import { Audit } from "../../models/Audit.js";

export const create = async (req, res) => {
  const { email, pass, modulos, perms } = req.body;
  const data = req.body;
  const user = req.headers.user;
  const app_id = req.headers.app;

  const doc = await new User({
    created_at: new Date(),
    updated_at: new Date(),
    ...data,
    pass: hash(data.pass),
    app_id,
    assoc_user: user,
  }).save();
  res.status(200).json(doc);
};

export const login = async (req, res) => {
  const { email, pass } = req.body;
  const app_id = req.headers.app;

  const d = {
    created_at: new Date(),
    intent: "login",
    app: app_id,
    data: req.body,
  };

  console.log(d, app_id)


  try {
    let user = await User.findOne({ email, pass: hash(pass), app_id });

    if (!user) {
      res.status(409).json({ info: "Credenciais incorrectas!" });
      await new Audit({
        ...d,
        success: false,
      }).save();
    } else {
      await new Audit({
        ...d,
        success: true,
      }).save();
      let assoc_user;
      if (user.assoc_user) {
        assoc_user = user;
        user = await User.findOne({ _id: user.assoc_user });
      }
      return res.json({ user, assoc_user });
    }
  } catch (error) {
    console.log(error);
    await new Audit({
      ...d,
      success: false,
    }).save();
    res.status(500).json({ error });
  }
};

export const all = async (req, res) => {
  const data = await User.find();
  res.json(data);
};

export const byApp = async (req, res) => {
  const docs = await User.find({ app_id: req.params.appId });
  const users = docs.map((doc) => ({ ...doc, pass: null }));
  res.json(users);
};

export const user = async (req, res) => {
  const _id = req.params.id;
  const docs = await User.find({ _id });
  let doc = {};
  if (docs.length !== 0) {
    doc = docs[0];
    delete doc.pass;
  }
  res.json(doc);
};

export const sendConfirmationCode = async (req, res) => {
  const { email, app = null } = req.body;
  const users = await User.find({ email, app_id: app });
  if (users.length === 0) {
    const code = String(Math.random()).substring(2, 7);
    // console.log(code);
    sendMail(email, app || "", "Codigo de confirmação: " + code);
    res.json({ msg: "Enviamos o código de confirmação para " + email, code });
  } else {
    res
      .status(409)
      .json({ msg: "Este email já foi usado, opte em recuperá-lo." });
  }
};

export const sendRecoveryCode = async (req, res) => {
  const { email, app = null } = req.body;

  const users = await User.find({ email, app_id: app });
  if (users.length === 0) {
    res.status(409).json({ info: "O email não existe!" });
  } else {
    const code = String(Math.random()).substring(2, 7);
    sendMail(email, app || "", "Código de recuperação:" + code);
    // console.log(code, email, app);
    const user = users[0];
    user.recovery_code = code;
    await user.save();
    res.json({ success: true });
  }
};

export const changePass = async (req, res) => {
  const { email, pass, code, app = null } = req.body;
  const users = await User.find({ email, recobery_code, app_id: app });

  if (users.length === 0) {
    res
      .status(409)
      .json({ msg: "O código introduzido é incorrecto, tente novamente." });
  } else {
    const user = users[0];
    user.pass = pass;
    user.app_id = app;
    await user.save();
    res.json({ msg: "Senha alterada com successo." });
  }
};

export const update = async (req, res) => {
  const _id = req.headers.user;

  const updatedUser = await User.findOneAndUpdate({ _id }, req.body, {
    new: true,
  });
  res.json(updatedUser);
};

// Assoc user
export const updateAssocUser = async (req, res) => {
  const assoc_user = req.headers.assoc_user;

  const data = req.body;

  if (data.pass) {
    data.pass = hash(data.pass);
  } else {
    delete data.pass;
  }

  const user = await User.findOneAndUpdate({ _id: assoc_user }, data, {
    new: true,
  });

  res.json(user);
};
