const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost:8080',
    'http://ivitalka-mesto.nomoredomains.icu',
    'https://ivitalka-mesto.nomoredomains.icu',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('connected'));

const usersRouter = require('./routes/users');

const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./conrollers/users');

const app = express();
app.use('*', cors(options));
app.use(bodyParser.json());
app.use(requestLogger);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(6),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(6),
  }),
}), login);
app.use(auth);
app.use('/', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    Authorization: Joi.string(),
  }).unknown(true),
}), usersRouter, cardsRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
  next();
});
app.listen(PORT);
