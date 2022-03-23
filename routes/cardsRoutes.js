const express = require("express");
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cardsController");
const cardsRoutes = express.Router();

cardsRoutes.get("/", getCards);
cardsRoutes.post("/", createCard);
cardsRoutes.delete("/:cardId", deleteCard);
cardsRoutes.put("/:cardId/likes", likeCard);
cardsRoutes.delete("/:cardId/likes", dislikeCard);

exports.cardsRoutes = cardsRoutes;
