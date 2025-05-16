const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const name = "Bruno";

  res.send('API funcionando!');
});

module.exports = router;
