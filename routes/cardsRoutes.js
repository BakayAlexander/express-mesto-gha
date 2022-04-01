const express = require('express');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardsController');
const {
  createCardValidation,
  idValidation,
} = require('../middlewares/validations');

const cardsRoutes = express.Router();

cardsRoutes.get('/', getCards);
cardsRoutes.post('/', createCardValidation, createCard);
cardsRoutes.delete('/:cardId', idValidation, deleteCard);
cardsRoutes.put('/:cardId/likes', idValidation, likeCard);
cardsRoutes.delete('/:cardId/likes', idValidation, dislikeCard);

exports.cardsRoutes = cardsRoutes;
