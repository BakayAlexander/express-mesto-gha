const express = require('express');

const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  getUserMe,
} = require('../controllers/userController');
const {
  validateProfile,
  validateAvatar,
  userIdValidation,
} = require('../middlewares/validations');

const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);
usersRoutes.get('/me', getUserMe);
usersRoutes.get('/:userId', userIdValidation, getUserById);
usersRoutes.patch('/me', validateProfile, updateUserProfile);
usersRoutes.patch('/me/avatar', validateAvatar, updateUserAvatar);

exports.usersRoutes = usersRoutes;
