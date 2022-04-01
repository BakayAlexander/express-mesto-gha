const JWT_SECRET = 'JWT_SECRET';
const SALT_ROUNDS = 10;
const regEx = /(https*:\/\/)([\w-]{1,32}\.[\w-]{1,32})[^\s@]*#*/m;

module.exports = { JWT_SECRET, SALT_ROUNDS, regEx };
