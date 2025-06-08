const app = require("./app");
const PORT = process.env.PORT || 5000;
const sequelize = require("./config/database");

const transacoesRoutes = require("./routes/transacoesRoutes");
app.use("/api/transacoes", transacoesRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);


/*app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  sequelize.sync({ alter: true }).then(() => {
    console.log("Banco de dados sincronizado!");*/

    app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

  sequelize.sync({ alter: true })
    .then(() => {
      console.log("✅ Banco de dados sincronizado!");
    })
    .catch((err) => {
      console.error("❌ Erro ao sincronizar banco:", err);
    });

    sequelize.sync({ force: true })
  .then(() => console.log("✅ Banco de dados recriado com sucesso!"))
  .catch(error => console.error("💥 Erro ao sincronizar banco:", error));

});

