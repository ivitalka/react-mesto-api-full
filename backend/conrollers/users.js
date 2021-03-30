const bcrypt = require('bcrypt');
const BadRequestError = require('../errors/bad-request-err');
const UserModel = require('../models/user');
const { generateSign, SALT_ROUNDS } = require('../utils/jwt');
const { errorResponse, checkData, userNotFound } = require('../utils/err-response');

const createUser = (req, res, next) => {
  const { email, password } = req.body;
  checkData(res, email, password);
  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => UserModel.create({ email, password: hash }))
    .then(() => {
      res.status(200).send({ message: 'Пользователь зарегистрирован!' });
    })
    .catch((err) => {
      errorResponse(err);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  checkData(res, email, password);
  UserModel.findOne({ email }).select('+password')
    .orFail(() => {
      userNotFound();
    })
    .then((user) => ({
      user,
      isPasswordEqual: bcrypt.compareSync(password, user.password),
    }))
    .then(({ user, isPasswordEqual }) => {
      if (!isPasswordEqual) {
        throw new BadRequestError('Не верно введен email или пароль');
      }
      const token = generateSign({ _id: user._id });
      return res.status(200).send({ token });
    })
    .catch((err) => {
      errorResponse(err);
    })
    .catch(next);
};

const getUsers = (req, res, next) => UserModel.find({})
  .then((users) => res.status(200).send(users))
  .catch((err) => {
    errorResponse(err);
  })
  .catch(next);

const getProfile = (req, res, next) => UserModel.findById(req.params._id)
  .orFail(() => {
    userNotFound();
  })
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    errorResponse(err);
  })
  .catch(next);

const updateProfile = (req, res, next) => UserModel.findByIdAndUpdate(req.user._id, req.body,
  { new: true, runValidators: true })
  .orFail(() => {
    userNotFound();
  })
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    errorResponse(err);
  })
  .catch(next);

const updateAvatar = (req, res, next) => UserModel.findByIdAndUpdate(req.user._id, req.body,
  { new: true, runValidators: true })
  .orFail(() => {
    userNotFound();
  })
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    errorResponse(err);
  })
  .catch(next);

const getCurrentUser = (req, res, next) => {
  UserModel.findById(req.user._id)
    .orFail(() => {
      userNotFound();
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      errorResponse(err);
    })
    .catch(next);
};

module.exports = {
  getUsers, getProfile, createUser, updateProfile, updateAvatar, login, getCurrentUser,
};
