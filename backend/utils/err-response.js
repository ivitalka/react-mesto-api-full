const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const DuplicateError = require('../errors/duplicate-err');
const InternalError = require('../errors/internal-err');
const ForbiddenError = require('../errors/forbidden-err');
const UnathorizedError = require('../errors/unauthorized-err');

const MONGO_DUPLICATE_ERROR_CODE = 11000;

const errorResponse = (err) => {
  if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
    throw new DuplicateError('Такой пользователь уже существует');
  }
  if (err.statusCode === 400) {
    throw new BadRequestError(err.message);
  }
  if (err.statusCode === 401) {
    throw new UnathorizedError(err.message);
  }
  if (err.name === 'ValidationError') {
    throw new BadRequestError('Некорректные данные');
  }
  if (err.statusCode === 404) {
    throw new NotFoundError(err.message);
  }
  if (err.statusCode === 403) {
    throw new ForbiddenError(err.message);
  }
  if (err.kind === 'ObjectId') {
    throw new BadRequestError('Невалидный id');
  }
  throw new InternalError('Ошибка сервера');
};

const userNotFound = () => {
  throw new NotFoundError('Такой пользователь не зарегестрирован');
};
const cardNotFound = () => {
  throw new NotFoundError('Карточка не найдена');
};

const checkData = (res, email, password) => {
  if (!email || !password) {
    throw new BadRequestError('Не передан email или пароль');
  }
};

module.exports = {
  errorResponse, checkData, userNotFound, cardNotFound,
};
