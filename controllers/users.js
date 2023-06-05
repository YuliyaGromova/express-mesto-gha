/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
const User = require("../models/user");

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
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => {
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

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
