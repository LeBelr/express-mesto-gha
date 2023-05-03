const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { incorrectDataError, RegError } = require('./errors/errors');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.use(errors());
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(incorrectDataError).send({ message: 'Переданы некорректные данные при создании' });
    return;
  }
  if (err.name === 'CastError') {
    res.status(incorrectDataError).send({ message: 'Передан некорректный id' });
    return;
  }
  if (err.code === 11000) {
    res.status(RegError).send({ message: 'Пользователь с данной почтой существует' });
    return;
  }
  if (err === 'Bad Request') {
    res.status(incorrectDataError).send({ message: 'Переданы некорректные данные' });
    return;
  }

  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });

  next();
});

app.listen(PORT, () => {
  console.log(`Сервер на порте ${PORT}`);
});
