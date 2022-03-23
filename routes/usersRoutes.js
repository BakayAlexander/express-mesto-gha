const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/userController');
const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);
usersRoutes.get('/:userId', getUserById);
//в post запросе можно использовать промежуточное express.json()
usersRoutes.post('/', createUser);
usersRoutes.patch('/me', updateUserProfile);
usersRoutes.patch('/me/avatar', updateUserAvatar);

exports.usersRoutes = usersRoutes;
