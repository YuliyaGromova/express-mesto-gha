/* eslint-disable object-curly-newline */
const router = require('express').Router();
const { getUsers, getUserById, updateUserInfo, updateUserAvatar, getUserInfo } = require('../controllers/users');

router.get('/', getUsers);

router.get('/:id', getUserById);

// router.post('/', createUser);
router.get('/me', getUserInfo);

router.patch('/me', updateUserInfo);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
