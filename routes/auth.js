/* eslint-disable eol-last */
const router = require('express').Router();
const { createUser, login } = require('../controllers/users');

router.post('/signin', login);

router.post('/signup', createUser);

router.all('/*', (req, res) => {
  res.status(404).send({ message: 'Вы ввели некоректные данные' });
});

module.exports = router;