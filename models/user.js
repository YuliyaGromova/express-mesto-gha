/* eslint-disable consistent-return */
/* eslint-disable no-useless-escape */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const validator = require('validator');

const validateUrl = (url) => {
  const reGex = /https?:\/\/w?w?w?[a-z.\/0-9\-\_\~\:\/\?\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+#?/g;
  if (reGex.test(url)) {
    return url;
  }
};

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
    // validate: [validator.isURL, 'Вы ввели некорректную ссылку на изображение'],
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: [validateUrl, 'Введите корректный URL'],
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

// userSchema.methods.toJSON = () => {
//   const user = this.toObject();
//   delete user.password;

//   return user;
// };

const User = mongoose.model('user', userSchema);
module.exports = { User, validateUrl };
