const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { regEx } = require('../config');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isEmail,
      message: 'Невалидный email',
      isAsync: false,
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // убираем возврат пароля в ответе сервера
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив-Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    minlength: 2,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: regEx,
      message: 'Указана неверная ссылка',
    },
  },
});

exports.User = mongoose.model('user', userSchema);
