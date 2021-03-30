const router = require('express').Router();
const {
  getUsers, getProfile, updateProfile, updateAvatar, getCurrentUser,
} = require('../conrollers/users');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:_id', getProfile);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);
module.exports = router;
