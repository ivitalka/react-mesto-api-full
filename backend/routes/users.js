const router = require('express').Router();
const {
  getUsers, getProfile, updateProfile, updateAvatar, getCurrentUser,
} = require('../conrollers/users');
const celebrateValidation = require('../middlewares/celebrate-validation');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:_id', celebrateValidation, getProfile);
router.patch('/users/me', celebrateValidation, updateProfile);
router.patch('/users/me/avatar', celebrateValidation, updateAvatar);
module.exports = router;
