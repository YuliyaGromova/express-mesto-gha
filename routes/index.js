const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const authRoutes = require('./auth');

const { NotFoundError } = require('../errors/not-found-err');

router.use('/users', auth, userRoutes);
router.use('/cards', auth, cardRoutes);
router.use('/', authRoutes);
router.all('/*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;
