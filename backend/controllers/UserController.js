const { findUserById } = require('../models/User');

async function getProfile(req, res) {
  try {
    const user = await findUserById(req.user.id); 
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ user: { nome: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getProfile };
