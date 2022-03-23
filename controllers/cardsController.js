const { Card } = require('../models/cardModels');

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    return res.status(500).send({ message: 'Ошибка чтения карточек.' });
  }
};

exports.createCard = async (req, res) => {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;
    const likes = [];
    const card = await Card.create({ name, link, owner, likes });
    return res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({
        message: 'Переданы некорректные данные при создании карточки',
      });
    } else {
      return res.status(500).send({ message: 'Ошибка чтения карточек.' });
    }
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);
    if (card) {
      res.send(card);
    } else {
      return res.status(404).send({
        message: `Карточка по указанному id:${req.params.cardId} не найдена`,
      });
    }
  } catch (err) {
    return res.status(500).send({ message: 'Ошибка чтения карточек.' });
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
    res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({
        message: 'Переданы некорректные данные для постановки/снятии лайка.',
      });
    } else if (err.name === 'CastError') {
      return res.status(404).send({
        message: `Передан несуществующий id: ${req.params.cardId} карточки.`,
      });
    } else {
      return res.status(500).send({ message: 'Ошибка чтения карточек.' });
    }
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
    res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({
        message: 'Переданы некорректные данные для постановки/снятии лайка.',
      });
    } else if (err.name === 'CastError') {
      return res.status(404).send({
        message: `Передан несуществующий id: ${req.params.cardId} карточки.`,
      });
    } else {
      return res.status(500).send({ message: 'Ошибка чтения карточек.' });
    }
  }
};
