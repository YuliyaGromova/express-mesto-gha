/* eslint-disable no-useless-escape */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-newline */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { reg } = require('../utils/validate-url-err');
const { getUsers, getUserById, updateUserInfo, updateUserAvatar, getUserInfo } = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24),
  }),
}), getUserInfo);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24),
  }),
}), getUserById);

router.patch('/me', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24),
  }),
  body: Joi.object().keys({
    avatar: Joi.string().pattern(reg),
  }).unknown(true),
}), updateUserAvatar);

module.exports = router;
