const mongoose = require('mongoose');
const { regEx } = require('../config');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: regEx,
      message: 'Указана неверная ссылка',
    },
  },
  owner: {
    type: mongoose.Types.ObjectId, // Тип данных для monggose
    ref: 'user', // очень важно указать ссылку и проверить, что она ведет именно туда куда надо
    required: true,
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

exports.Card = mongoose.model('card', cardSchema);
