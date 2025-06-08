const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "users",
  timestamps: false, // Mantém sem timestamps para evitar colunas desnecessárias
});

// 🔥 Métodos auxiliares para facilitar buscas no banco
User.createUser = async function (name, email, password) {
    return await User.create({ name, email, password });
};

User.findUserByEmail = async function (email) {
  return await User.findOne({ where: { email } });
};

User.findUserById = async function (id) {
  return await User.findByPk(id, { attributes: ["id", "name", "email"] });
};

module.exports = User;