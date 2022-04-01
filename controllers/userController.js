const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, SALT_ROUNDS } = require('../config');
const ConflictError = require('../erros/ConflictError');
const UnathoriazedError = require('../erros/UnathoriazedError');
const ValidationError = require('../erros/ValidationError');
const { User } = require('../models/userModels');

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email }, '+password');
    if (!existingUser) {
      return next(new UnathoriazedError('Не верный логин или пароль'));
    }
    const compare = await bcrypt.compare(password, existingUser.password);
    if (!compare) {
      return next(new UnathoriazedError('Не верный логин или пароль'));
    }
    const token = jwt.sign({ _id: existingUser._id }, JWT_SECRET, {
      expiresIn: '7d',
    });
    return res.send({ token });
  } catch (err) {
    return next(err);
  }
};
exports.createUser = async (req, res, next) => {
  try {
    // eslint-disable-next-line object-curly-newline
    const { email, password, name, about, avatar } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(
        new ConflictError('Пользователь с таким email уже существует'),
      );
    }
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    });
    // Необходимо использовать промежуточное решение, чтобы mongoose не возвращал пароль
    const userWithoutPassword = await User.findOne({ _id: user._id });
    return res.send(userWithoutPassword);
  } catch (err) {
    return next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  if (!req.user) {
    return next(new UnathoriazedError('Нет прав доступа'));
  }
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    return next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      return res.send(user);
    }
    return next(new UnathoriazedError('Нет прав доступа'));
  } catch (err) {
    return next(err);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    if (!req.user) {
      return next(new UnathoriazedError('Нет прав доступа'));
    }
    const result = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (result) {
      return res.send(result);
    }
    return next(new UnathoriazedError('Нет прав доступа'));
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError('Введены некорректные данные'));
    }
    return next(err);
  }
};

exports.updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    // if (!avatar) {
    //   return next(new ValidationError('Введены некорректные данные'));
    // }
    const result = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    if (result) {
      return res.send(result);
    }
    return next(new UnathoriazedError('Нет прав доступа'));
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError('Введены некорректные данные'));
    }
    return next(err);
  }
};
