const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User"); 

const Transacao = sequelize.define("Transacao", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  valor: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM("entrada", "saida"),
    allowNull: false,
  },
  data: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Transacao;