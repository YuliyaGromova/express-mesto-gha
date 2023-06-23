/* eslint-disable no-useless-escape */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable spaced-comment */
const mongoose = require('mongoose');
// const { validateURL } = require('../utils/validate-url-err');
const validator = require('validator');

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
    validate: [validator.isURL, 'Вы ввели некорректную ссылку'],
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
