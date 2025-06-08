const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

(async () => {
  try {
    const result = await sequelize.query("SELECT typname FROM pg_type WHERE typname = 'enum_transacoes_tipo';");
    if (!result[0].length) {
      await sequelize.query("CREATE TYPE enum_transacoes_tipo AS ENUM ('entrada', 'saida');");
      console.log(" ENUM criado com sucesso!");
    } else {
      console.log(" ENUM já existe, seguindo com a sincronização...");
    }
  } catch (err) {
    console.error(" Erro ao verificar/criar ENUM:", err);
  }
})();

const Transacao = sequelize.define("Transacao", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "users",
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
}, {
  tableName: "transacoes",
});

module.exports = Transacao;