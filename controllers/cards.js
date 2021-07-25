const NotFoundError = require('../errors/NotFoundError');
const FaultRequest = require('../errors/FaultRequest');
const InternalServerError = require('../errors/InternalServerError');
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      throw new InternalServerError(`Ошибка - ${err.message}`);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new FaultRequest('Переданы некорректные данные при создании карточки.');
      } else {
        throw new InternalServerError(`Ошибка - ${err.message}`);
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new FaultRequest('Карточка с указанным _id не найдена.');
      }
      throw new InternalServerError(`Ошибка - ${err.message}`);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Переданы некорректные данные для постановки/снятии лайка.');
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new FaultRequest('Переданы некорректные данные для постановки/снятии лайка.');
      }
      throw new InternalServerError(`Ошибка - ${err.message}`);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      throw new NotFoundError('Переданы некорректные данные для постановки/снятии лайка.');
    } else {
      res.status(200).send({ data: card });
    }
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new FaultRequest('Переданы некорректные данные для постановки/снятии лайка.');
      }
      throw new InternalServerError(`Ошибка - ${err.message}`);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
