/* eslint-disable no-useless-escape */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable spaced-comment */
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /https?:\/\/w?w?w?[a-z.\/0-9\-\_\~\:\/\?\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+#?/g.test(v);
      },
      message: "Вы ввели некорректную ссылку на изображение"
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
