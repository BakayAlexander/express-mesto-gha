const { User } = require('../models/userModels');
const { usersRoutes } = require('../routes/usersRoutes');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    return res.status(500).send({ message: 'Ошибка чтения пользователей.' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      res.send(user);
    } else {
      return res.status(404).send({
        message: `Пользователь по указанному id:${req.params.userId} не найден`,
      });
    }
  } catch (err) {
    return res.status(500).send({ message: 'Ошибка чтения пользователей.' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({
        message: 'Переданы некорректные данные при создании пользователя.',
      });
    } else {
      return res.status(500).send({ message: 'Ошибка чтения пользователей.' });
    }
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true });
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({
        message: 'Переданы некорректные данные при обновлении профиля.',
      });
    } else if (err.name === 'CastError') {
      return res.status(404).send({
        message: `Пользователь с указанным id:${req.user._id} не найден. `,
      });
    } else {
      return res.status(500).send({ message: 'Ошибка чтения пользователей.' });
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
      }
    );
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({
        message: 'Переданы некорректные данные при обновлении аватара.',
      });
    } else if (err.name === 'CastError') {
      return res.status(404).send({
        message: `Пользователь с указанным id:${req.user._id} не найден. `,
      });
    } else {
      return res.status(500).send({ message: 'Ошибка чтения пользователей.' });
    }
  }
};
