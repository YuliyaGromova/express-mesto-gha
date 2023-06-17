/* eslint-disable eol-last */
const router = require('express').Router();
const { createUser, login } = require('../controllers/users');

router.post('/signin', login);

router.post('/signup', createUser);

router.all('/*', (req, res, next) => {
  next(new Error('Маршрут не найден'));
});

module.exports = router;