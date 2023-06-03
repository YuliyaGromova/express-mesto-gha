/* eslint-disable semi */
const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res
      .status(500)
      .send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      })
  }
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'Not found') {
        res
          .status(404)
          .send({
            message: 'Запрашиваемый пользователь не найден',
          });
      } else if (err.message.includes('failed for value')) {
        res.status(400).send({ message: 'Вы ввели некоректные данные' });
      } else {
        res
          .status(500)
          .send({
            message: 'Internal Server Error',
            err: err.message,
            stack: err.stack,
          });
      }
    });
};

const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.message.includes('validation failed')) {
        res.status(400).send({ message: 'Вы ввели некоректные данные' });
      } else {
        res
          .status(500)
          .send({
            message: 'Internal Server Error',
            err: err.message,
            stack: err.stack,
          });
      }
    });
};

// PATCH /users/me — обновляет профиль
const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body)
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.message === 'Not found') {
        res
          .status(404)
          .send({
            message: 'Запрашиваемый пользователь не найден',
          });
      } else if (err.message.includes('validation failed')) {
        res.status(400).send({ message: 'Вы ввели некоректные данные' });
      } else {
        res
          .status(500)
          .send({
            message: 'Internal Server Error',
            err: err.message,
            stack: err.stack,
          });
      }
    });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
};
