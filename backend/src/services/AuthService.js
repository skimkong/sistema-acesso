const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService = require('./UserService');

class AuthService {
  static async authenticate(email, password) {
    const user = await UserService.findByEmail(email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { token };
  }
}

module.exports = AuthService;
