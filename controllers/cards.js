const Card = require('../models/card');

const incorrectDataError = 400;
const notFoundError = 404;
const serverError = 500;

function getAllCards(req, res) {
  Card.find({}).populate('owner')
    .then((allCards) => {
      res.send(allCards);
    })
    .catch(() => {
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
}

function createCard(req, res) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(incorrectDataError).send({ message: 'Переданы некорректные данные при создании карточки' });
        return;
      }
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
}

function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(notFoundError).send({ message: 'Передан несуществующий id карточки' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(incorrectDataError).send({ message: 'Передан некорректный id карточки' });
        return;
      }
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
}

function likeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).populate('likes')
    .then((card) => {
      if (!card) {
        res.status(notFoundError).send({ message: 'Передан несуществующий id карточки' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(incorrectDataError).send({ message: 'Переданы некорректные данные для постановки лайка' });
        return;
      }
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
}

function unlikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(notFoundError).send({ message: 'Передан несуществующий id карточки' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(incorrectDataError).send({ message: 'Переданы некорректные данные для снятия лайка' });
        return;
      }
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
}

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
