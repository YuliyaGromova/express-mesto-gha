/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-newline */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, getUserById, updateUserInfo, updateUserAvatar, getUserInfo } = require('../controllers/users');

router.get('/', getUsers);

router.get('/:id', getUserById);

// router.post('/', createUser);
router.get('/me', getUserInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }).unknown(true),
}), updateUserAvatar);

module.exports = router;
