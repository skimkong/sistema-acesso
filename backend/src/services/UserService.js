const bcrypt = require('bcrypt');
const User = require('../models/User');

class UserService {
  static async createUser({ email, password }) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Usuário já existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    return newUser;
  }

  static async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }
}

module.exports = UserService;
