const { celebrate, Joi, Segments } = require('celebrate');
const { regEx } = require('../config');

const register = celebrate({
  [Segments.BODY]: Joi.object().keys({
    // eslint-disable-next-line newline-per-chained-call
    password: Joi.string().required().min(6).max(20).messages({
      'any.required': 'Пароль не указан',
      'string.min': 'Пароль должен быть длинее 5 символов',
      'string.max': 'Пароль должен быть короче 20 символов',
    }),
    email: Joi.string().required().messages({
      'any.required': 'Email не указан',
      'string.notEmail': 'Email некорректный',
    }),
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Имя должно быть длинее 2 символов',
      'string.max': 'Имя должно быть короче 30 символов',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Описание должно быть длинее 2 символов',
      'string.max': 'Описание должно быть короче 30 символов',
    }),
    avatar: Joi.string().pattern(regEx),
  }),
});

module.exports = { register };
