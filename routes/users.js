/* eslint-disable no-useless-escape */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-newline */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { reg } = require('../utils/validate-url-err');
const { getUsers, getUserById, updateUserInfo, updateUserAvatar, getUserInfo } = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(reg),
  }).unknown(true),
}), updateUserAvatar);

module.exports = router;
