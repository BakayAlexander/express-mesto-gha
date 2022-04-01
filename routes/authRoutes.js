const express = require('express');
const { createUser, loginUser } = require('../controllers/userController');
const { register } = require('../middlewares/validations');

const authRoutes = express.Router();

authRoutes.post('/signup', register, createUser);
authRoutes.post('/signin', register, loginUser);

exports.authRoutes = authRoutes;
