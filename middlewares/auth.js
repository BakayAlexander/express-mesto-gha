const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const UnathoriazedError = require('../erros/UnathoriazedError');

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new UnathoriazedError('Нет прав доступа'));
  }

  const token = req.headers.authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnathoriazedError('Нет прав доступа'));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
