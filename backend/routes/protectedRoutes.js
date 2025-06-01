const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: `Bem-vindo, ${req.user.name}! Esta é uma rota protegida.` });
});

module.exports = router;
