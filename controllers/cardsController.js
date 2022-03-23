const { Card } = require('../models/cardModels');

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    res.status(500).send({ message: 'На сервере произошла ошибка.' });
  }
};

exports.createCard = async (req, res) => {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;
    const likes = [];
    const card = await Card.create({ name, link, owner, likes });
    res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({
        message: 'Переданы некорректные данные при создании карточки',
      });
    } else {
      res.status(500).send({ message: 'На сервере произошла ошибка.' });
    }
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);
    if (card) {
      res.send(card);
    } else {
      res.status(404).send({
        message: `Карточка по указанному id:${req.params.cardId} не найдена`,
      });
    }
  } catch (err) {
    res.status(400).send({ message: 'На сервере произошла ошибка.' });
  }
};

exports.likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      {
        $addToSet: { likes: req.user._id }, //добавить лайк если его еще нет
      },
      { new: true }
    );
    if (card) {
      res.send(card);
    } else {
      res.status(404).send({
        message: 'Переданы некорректные данные для постановки лайка.',
      });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({
        message: `Передан несуществующий id: ${req.params.cardId} карточки.`,
      });
    } else {
      res.status(500).send({ message: 'На сервере произошла ошибка.' });
    }
    console.log(err.name);
  }
};

exports.dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      {
        $pull: { likes: req.user._id }, //убрать лайк он есть
      },
      { new: true }
    );
    if (card) {
      res.send(card);
    } else {
      res.status(404).send({
        message: 'Переданы некорректные данные для снятия лайка.',
      });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({
        message: `Передан несуществующий id: ${req.params.cardId} карточки.`,
      });
    } else {
      res.status(500).send({ message: 'На сервере произошла ошибка.' });
    }
    console.log(err.name);
  }
};
