const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createUser, findUserByEmail } = require('../models/User');


async function register(req, res) {
  const { name, email, password } = req.body;
  try {
    const hasshedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, hashedpassword);
    
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      message: 'Usuário cadastrado com sucesso',
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { register, login };
