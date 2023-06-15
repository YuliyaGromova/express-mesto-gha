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

const { checkError } = require('./errors');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    checkError(err, req, res);
  }
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => new Error("Not found"))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      checkError(err, req, res);
    });
};

const createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.log(err);
      checkError(err, req, res);
    });
};

// PATCH /users/me — обновляет профиль
const updateUserInfo = (req, res) => {
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
      .catch((err) => {
        checkError(err, req, res);
      });
  } else {
    res.status(400).send({ message: "Вы ввели некоректные данные" });
  }
};

const updateUserAvatar = (req, res) => {
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
      .catch((err) => {
        checkError(err, req, res);
      });
  } else {
    res.status(400).send({ message: "Вы ввели некоректные данные" });
  }
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      // console.log(user);
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
    })
    .then((matched) => {
      // console.log(matched);
      if (!matched) {
        // хеши не совпали — отклоняем промис
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      const token = jwt.sign({ _id: User._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

const getUserInfo = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => new Error("Not found"))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      checkError(err, req, res);
    });
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
