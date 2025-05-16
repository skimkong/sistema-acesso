
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rota para login
router.post('/login', AuthController.login);

// Rota para registro de novo usuário
//router.post('/register', AuthController.register);

module.exports = router;
