const { User } = require('../models/userModels');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: 'На сервере произошла ошибка.' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({
        message: `Пользователь по указанному id:${req.params.userId} не найден`,
      });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id' });
    } else {
      res.status(500).send({ message: 'На сервере произошла ошибка.' });
    }
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({
        message: 'Переданы некорректные данные при создании пользователя.',
      });
    } else {
      res.status(500).send({ message: 'На сервере произошла ошибка.' });
    }
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({
        message: `Пользователь по указанному id:${req.user._id} не найден.`,
      });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({
        message: 'Данные невалидны',
      });
    } else {
      res.status(500).send({ message: 'На сервере произошла ошибка.' });
    }
  }
};

exports.updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({
        message: `Пользователь по указанному id:${req.user._id} не найден`,
      });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({
        message: 'Невалидный id',
      });
    } else if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Данные невалидны' });
    } else {
      res.status(500).send({ message: 'На сервере произошла ошибка.' });
    }
  }
};
