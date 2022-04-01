const express = require('express');
const { authRoutes } = require('./authRoutes');
const auth = require('../middlewares/auth');

const routes = express.Router();
const { cardsRoutes } = require('./cardsRoutes');
const { usersRoutes } = require('./usersRoutes');

routes.use('/users', auth, usersRoutes);
routes.use('/cards', auth, cardsRoutes);
routes.use('/', authRoutes);

exports.routes = routes;
