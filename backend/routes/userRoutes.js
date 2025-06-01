const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.createUser(name, email, password);

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error); // 🛠️ Loga o erro no servidor
    res.status(500).json({ error: error.message || "Erro ao cadastrar usuário" });
  }
});

router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json({ message: "Perfil do usuário carregado com sucesso", user });
  } catch (error) {
    res.status(500).json({ error: "Erro ao carregar o perfil do usuário" });
  }
});

module.exports = router;