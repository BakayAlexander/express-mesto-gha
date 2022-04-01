const express = require('express');

const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/userController');

const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);
usersRoutes.get('/me', getUserById);
usersRoutes.patch('/me', updateUserProfile);
usersRoutes.patch('/me/avatar', updateUserAvatar);

exports.usersRoutes = usersRoutes;
