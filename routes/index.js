const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

function notFound(req, res) {
  res.status(404).send({ message: 'Ошибка 404 - Страница не найдена' })
}

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', notFound);

module.exports = router;