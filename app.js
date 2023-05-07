const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const handlerErrors = require('./middlewares/handlerErrors');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.use(errors());
app.use(handlerErrors);

app.listen(PORT, () => {
  console.log(`Сервер на порте ${PORT}`);
});
