const express = require("express");
const router = express.Router();
const { validateUser, User } = require("../models/user");

router.get("/", async (req, res) => {
  if (req.query.idade) {
    const users = await User.find({ idade: parseInt(req.query.idade) });
    if (users.length === 0)
      return res.status(404).send("404 - Não encontramos seu registro aqui!");
    return res.send(users);
  }

  const users = await User.find().sort("idade");
  res.send(users);
});

router.get("/idades-extremas", async (req, res) => {
  const users = await User.find().sort("idade");
  res.send([users[0], users[users.length - 1]]);
});

router.get("/media-idades", async (req, res) => {
  const users = await User.find({}, "idade").sort("idade");
  if (!users) return res.status(404).send("Não foram encontrados usuários");

  let idadeMedia = 0;
  users.map((user) => (idadeMedia += user.idade));
  idadeMedia = idadeMedia / users.length;

  res.send({ media: idadeMedia });
});

router.get("/:cpf", async (req, res) => {
  const userFound = await User.findOne({ cpf: req.params.cpf });
  if (!userFound)
    return res.status(404).send("404 - Não encontramos seu registro aqui!");

  res.send(userFound);
});

router.post("/", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await new User(req.body);
    user = await user.save();

    res.send(user);
  } catch (err) {
    res.send(err.message);
  }
});

router.put("/:cpf", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOneAndUpdate(
      { cpf: req.params.cpf },
      req.body,
      {
        new: true,
      }
    );
    if (!user)
      return res.status(404).send("404 - Não encontramos seu registro aqui!");

    res.send(user);
  } catch (err) {
    res.send(err.message);
  }
});

router.delete("/:cpf", async (req, res) => {
  const user = await User.findOneAndDelete({ cpf: req.params.cpf });
  if (!user)
    return res.status(404).send("404 - Não encontramos seu registro aqui!");

  res.send(user);
});

module.exports = router;
