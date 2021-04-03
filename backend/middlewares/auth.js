const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const UnauthorizedError = require('../errors/unauthorized-err');
const { errorResponse, userNotFound } = require('../utils/err-response');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Требуется авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'very_secret');
  } catch (err) {
    throw new UnauthorizedError('Нет доступа');
  }
  UserModel.findById(payload.payload._id)
    .orFail(() => {
      userNotFound();
    })
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => errorResponse(err))
    .catch(next);
};
