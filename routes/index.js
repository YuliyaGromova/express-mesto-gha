const router = require('express').Router();
// const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const authRoutes = require('./auth');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/', authRoutes);

module.exports = router;
