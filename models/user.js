/* eslint-disable arrow-parens */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable no-useless-escape */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: [validator.isURL, 'Вы ввели некорректную ссылку'],
  },
  email: {
    type: String,
    required: [true, "Поле 'Email' обязательное"],
    unique: true,
    validate: [validator.isEmail, 'Вы ввели некорректный email'],
  },
  password: {
    type: String,
    required: [true, "Введите пароль"],
    select: false,
  },
});

const User = mongoose.model('user', userSchema);
module.exports = { User };
