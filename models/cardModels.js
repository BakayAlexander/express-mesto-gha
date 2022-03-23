const mongoose = require('mongoose');

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
