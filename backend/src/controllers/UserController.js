// backend/src/controllers/UserController.js
const User = require("../models/User");

// Função para obter o usuário
const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id); // Usando Sequelize para buscar o usuário
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar usuário", error });
  }
};

// Função para atualizar o usuário
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, senha } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    user.email = email || user.email;
    user.senha = senha || user.senha;

    await user.save();
    return res.json({ message: "Usuário atualizado com sucesso", user });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar usuário", error });
  }
};

// Função para excluir o usuário
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    await user.destroy();
    return res.json({ message: "Usuário excluído com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao excluir usuário", error });
  }
};

module.exports = { getUser, updateUser, deleteUser };
