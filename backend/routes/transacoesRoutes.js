const express = require("express");
const router = express.Router();
const { Transacao } = require("../models/Transacao");
const authMiddleware = require("../middlewares/authMiddleware");


router.post("/", authMiddleware, async (req, res) => {
  try {
    const { descricao, valor, tipo } = req.body;
    const novaTransacao = await Transacao.create({
      user_id: req.user.id,
      descricao,
      valor,
      tipo,
    });
    res.status(201).json(novaTransacao);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar transação!" });
  }
});


router.get("/", authMiddleware, async (req, res) => {
  try {
    const transacoes = await Transacao.findAll({ where: { user_id: req.user.id } });
    res.status(200).json(transacoes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar transações!" });
  }
});


router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { descricao, valor, tipo } = req.body;
    const transacao = await Transacao.findByPk(req.params.id);
    if (!transacao || transacao.user_id !== req.user.id) {
      return res.status(403).json({ error: "Transação não encontrada!" });
    }
    await transacao.update({ descricao, valor, tipo });
    res.status(200).json(transacao);
  } catch (error) {
    res.status(500).json({ error: "Erro ao editar transação!" });
  }
});


router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const transacao = await Transacao.findByPk(req.params.id);
    if (!transacao || transacao.user_id !== req.user.id) {
      return res.status(403).json({ error: "Transação não encontrada!" });
    }
    await transacao.destroy();
    res.status(200).json({ message: "Transação excluída!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir transação!" });
  }
});

module.exports = router;