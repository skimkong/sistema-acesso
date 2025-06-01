const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
},

{
  tableName: "users",
  timestamps: false,
  freezeTableName: true,
});

User.createUser = async function (name, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.create({ name, email, password: hashedPassword });
};

User.findUserByEmail = async function (email) {
  return await User.findOne({ where: { email } });
};


User.findUserById = async function (id) {
  return await User.findByPk(id, { attributes: ["id", "name", "email"] });
};

module.exports = User;