const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const { errors } = require('celebrate');

const { routes } = require('./routes/app');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./erros/NotFoundError');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json()); // сборка json-формата
app.use(bodyParser.urlencoded({ extended: true })); // прием web-страниц

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(routes);
app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресур не найден'));
});
app.use(errors());
app.use(errorHandler);

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
  } catch (err) {
    console.log(err);
  }

  app.listen(PORT, () => {
    console.log(`Starting app on port ${PORT}`);
  });
}

main();
