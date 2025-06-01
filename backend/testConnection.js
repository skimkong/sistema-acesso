const User = require("./models/User");

async function testarConexao() {
  try {
    const usuarios = await User.findAll();
    console.log("Usuários encontrados:", usuarios);
  } catch (error) {
    console.error("Erro ao acessar a tabela users:", error);
  }
}

testarConexao();