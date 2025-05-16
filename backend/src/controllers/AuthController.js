const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) return res.status(401).json({ message: "Senha inválida" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao fazer login", error });
  }
};

const register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const hash = await bcrypt.hash(senha, 10);
    const newUser = await User.create({ nome, email, senha: hash });
    return res.status(201).json({ message: "Usuário criado com sucesso", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao registrar usuário", error });
  }
};

module.exports = { login, register };
