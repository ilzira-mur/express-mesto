const cardRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/cards', auth, getCards);
cardRouter.post('/cards', auth, createCard);
cardRouter.delete('/cards/:cardId', auth, deleteCard);
cardRouter.put('/cards/:cardId/likes', auth, likeCard);
cardRouter.delete('/cards/:cardId/likes', auth, dislikeCard);

module.exports = cardRouter;
