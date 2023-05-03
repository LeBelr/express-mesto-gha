const cardsRouter = require('express').Router();
const {
  getAllCards, createCard, deleteCard, likeCard, unlikeCard,
} = require('../controllers/cards');
const { validateCreateCard } = require('../middlewares/validate');

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', validateCreateCard, createCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', unlikeCard);

module.exports = cardsRouter;
