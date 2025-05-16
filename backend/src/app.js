const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const sequelize = require('../config/database');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

sequelize.sync({ alter: true }) // ou { force: true } se quiser recriar
  .then(() => {
    console.log('Banco sincronizado');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar banco:', err);
  });

module.exports = app;
