const express = require('express');

const { cardsRoutes } = require('./cardsRoutes');

const routes = express.Router();

const { usersRoutes } = require('./usersRoutes');

routes.use('/users', usersRoutes);
routes.use('/cards', cardsRoutes);

exports.routes = routes;
