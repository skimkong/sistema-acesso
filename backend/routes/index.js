const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes'); 
const protectedRoutes = require('./protectedRoutes');

router.get('/', (req, res) => {
  res.send('API em pleno funcionamento!');
});

router.use('/auth', authRoutes);
router.use('/user', userRoutes); 
router.use('/protected', protectedRoutes);

module.exports = router;
