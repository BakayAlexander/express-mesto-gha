const { Card } = require('../models/cardModels');
const ValidationError = require('../erros/ValidationError');
const NotFoundError = require('../erros/NotFoundError');
const ConflictError = require('../erros/ConflictError');

exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (err) {
    return next(err);
  }
};

exports.createCard = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;
    const card = await Card.create(
      {
        name,
        link,
        owner,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Введены некорректные данные'));
    }
    return next(err);
  }
};

exports.deleteCard = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return next(new NotFoundError('Карточка с указанным id не найдена'));
    }
    const cardOwner = card.owner;
    if (userId.toString() === cardOwner.toString()) {
      const deleteCard = await Card.findByIdAndRemove(req.params.cardId);
      return res.send(deleteCard);
    }
    return next(new ConflictError('Вы не можете этого сделать'));
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new ValidationError('Данные не валидны'));
    }
    return next(err);
  }
};

exports.likeCard = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      {
        $addToSet: { likes: userId }, // добавить лайк если его еще нет
      },
      { new: true },
    );
    if (card) {
      return res.send(card);
    }
    return next(new NotFoundError('Карточка с указанным id не найдена'));
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new ValidationError('Данные не валидны'));
    }
    return next(err);
  }
};

exports.dislikeCard = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      {
        $pull: { likes: userId }, // убрать лайк он есть
      },
      { new: true },
    );
    if (card) {
      return res.send(card);
    }
    return next(new NotFoundError('Карточка с указанным id не найдена'));
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new ValidationError('Данные не валидны'));
    }
    return next(err);
  }
};
