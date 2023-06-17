const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const authRoutes = require('./auth');

router.use('/users', auth, userRoutes);
router.use('/cards', auth, cardRoutes);
router.use('/', authRoutes);

module.exports = router;
