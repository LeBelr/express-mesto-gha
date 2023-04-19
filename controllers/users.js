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
    });
}

function getUserById(req, res) {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(notFoundError).send({ message: 'Пользователь с указанным id не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(incorrectDataError).send({ message: 'Передан некорректный id пользователя' });
        return;
      }
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(incorrectDataError).send({ message: 'Переданы некорректные данные при создании пользователя' });
        return;
      }
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
}

function changeProfile(req, res) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res.status(notFoundError).send({ message: 'Пользователь с указанным id не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(incorrectDataError).send({ message: 'Переданы некорректные данные при обновлении профиля' });
        return;
      } if (err.name === 'CastError') {
        res.status(incorrectDataError).send({ message: 'Передан некорректный id пользователя' });
        return;
      }
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
}

function changeAvatar(req, res) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res.status(notFoundError).send({ message: 'Пользователь с указанным id не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(incorrectDataError).send({ message: 'Переданы некорректные данные при обновлении аватара' });
        return;
      } if (err.name === 'CastError') {
        res.status(incorrectDataError).send({ message: 'Передан некорректный id пользователя' });
        return;
      }
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  changeProfile,
  changeAvatar,
};
