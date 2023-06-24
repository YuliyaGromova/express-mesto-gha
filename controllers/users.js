/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
/* eslint-disable no-unreachable */
/* eslint-disable no-sequences */
/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NotFoundError } = require('../errors/not-found-err');
const { UniqueError } = require('../errors/unique-err');
const { ForbiddenError } = require('../errors/forbidden-err');
const { ValidationError } = require('../errors/validation-err');
const { UnauthorizedError } = require('../errors/unauthorized-err');

const { User } = require("../models/user");

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => new NotFoundError())
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => res.send({
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    },))
    .catch((err) => {
      if (err.code === 11000) { // 409
        next(new UniqueError());
      } else if (err.name === "ValidationError" || err.name === "CastError") { // 400
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

// PATCH /users/me — обновляет профиль
const updateUserInfo = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(() => new NotFoundError())
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") { // 400
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(() => new NotFoundError())
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") { // 400
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .orFail(() => {
      next(new UnauthorizedError('Не верный логин или пароль'));
    })
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((matched) => {
          // console.log(matched);
          if (!matched) {
            // хеши не совпали — отклоняем промис
            next(new UnauthorizedError('Не верный логин или пароль'));
          } else {
            const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
            res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true });
            res.send({ token });
          }
        })
    })
    .catch((err) => {
      next(err);
    })
};

const getUserInfo = (req, res, next) => {
  req.params.id = req.user._id;
  User.findById(req.params.id)
    .orFail(() => new NotFoundError())
    .then((user) => res.status(200).send(user))
    .catch(next);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getUserInfo,
};
