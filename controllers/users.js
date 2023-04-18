const User = require('../models/user');

const incorrectDataError = 400;
const notFoundError = 404;
const serverError = 500;

function getAllUsers(req, res) {
  User.find({})
    .then((allUsers) => {
      res.send(allUsers);
    })
    .catch(() => {
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    })
}

function getUserById(req, res) {
  User.findById(req.params.userId)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(notFoundError).send({ message: 'Пользователь по указанному id не найден' });
        return;
      }
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    })
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(incorrectDataError).send({ message: 'Переданы некорректные данные при создании пользователя' })
        return;
      }
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    })
}

function changeProfile(req, res) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name: name, about: about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(incorrectDataError).send({ message: 'Переданы некорректные данные при обновлении профиля' })
        return;
      } else if (err.name === 'CastError') {
        res.status(notFoundError).send({ message: 'Пользователь с указанным id не найден' })
        return;
      }
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    })
}

function changeAvatar(req, res) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar: avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(incorrectDataError).send({ message: 'Переданы некорректные данные при обновлении аватара' })
        return;
      } else if (err.name === 'CastError') {
        res.status(notFoundError).send({ message: 'Пользователь с указанным id не найден' })
        return;
      }
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  changeProfile,
  changeAvatar
}

