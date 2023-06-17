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
const User = require("../models/user");

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => new Error("Not found"))
    .then((user) => res.status(200).send(user))
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
    .then((user) => res.status(201).send(user))
    .catch(next);
};

// PATCH /users/me — обновляет профиль
const updateUserInfo = (req, res, next) => {
  if (req.body.name || req.body.about) {
    User.findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, about: req.body.about },
      {
        new: true,
        runValidators: true,
      }
    )
      .orFail(() => new Error("Not found"))
      .then((user) => res.status(200).send(user))
      .catch(next);
  } else {
    res.status(400).send({ message: "Вы ввели некоректные данные" });
  }
};

const updateUserAvatar = (req, res, next) => {
  if (req.body.avatar) {
    User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      {
        new: true,
        runValidators: true,
      }
    )
      .orFail(() => new Error("Not found"))
      .then((user) => res.status(200).send(user))
      .catch(next);
  } else {
    res.status(400).send({ message: "Вы ввели некоректные данные" });
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: "Введите логин и пароль" })
    return;
  }
  User.findOne({ email }).select('+password')
    .orFail(() => new Error("Не верный логин или пароль"))
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((matched) => {
          // console.log(matched);
          if (!matched) {
            // хеши не совпали — отклоняем промис
            res.status(403).send({ message: "Не верный логин или пароль" })
          } else {
            // res.send(user);
            const token = jwt.sign({ _id: User._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
            res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true });
            res.send({ token });
          }
        })
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new Error("Not found"))
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
