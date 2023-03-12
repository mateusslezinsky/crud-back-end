const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    cpf: { type: String, required: true, minlength: 14, maxlength: 14 },
    nome: { type: String, required: true, minlength: 3, maxlength: 255 },
    idade: { type: Number, required: true },
    telefone: { type: String, required: true },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    cpf: Joi.string().min(14).max(14).required(),
    nome: Joi.string().min(3).max(255).required(),
    idade: Joi.number().integer().required(),
    telefone: Joi.string().min(13).required(),
  });
  return schema.validate(user);
};

module.exports = { validateUser, User };
