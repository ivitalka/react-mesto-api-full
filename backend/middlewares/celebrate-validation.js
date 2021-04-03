const { celebrate, Joi } = require('celebrate');

const celebrateValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().hex().length(24),
  }),
  headers: Joi.object().keys({
    Authorization: Joi.string(),
  }).unknown(true),
});
module.exports = celebrateValidation;
