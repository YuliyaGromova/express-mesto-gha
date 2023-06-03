const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.all('/*', (req, res) => {
  res.status(404).send({ message: 'Вы ввели некоректные данные' });
});

module.exports = router;
