const cardsRouter = require('express').Router();
const {getAllCards, createCard, deleteCard, likeCard, unlikeCard} = require('../controllers/cards');

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', unlikeCard);

module.exports = cardsRouter;