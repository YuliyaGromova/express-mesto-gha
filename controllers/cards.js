/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable object-curly-spacing */
/* eslint-disable semi */
const Card = require('../models/card');
const { NotFoundError } = require('../errors/not-found-err');
const { ForbiddenError } = require('../errors/forbidden-err');
const {UnauthorizedError} = require('../errors/unauthorized-err');

const getCards = async (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  req.body.owner = req.user._id;
  Card.create({
    ...req.body,
  })
    .then((card) => res.send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError())
    .then((item) => {
      if (String(item.owner) === String(req.user._id)) {
        Card.deleteOne(item)
          .orFail(() => new NotFoundError())
          .then(() => res.status(200).send({ message: "Удаление карточки выполнено"}))
          .catch(next);
      } else {
        next(new ForbiddenError("Нельзя удалить чужую карточку"));
      }
    })
    .catch((err) => next(new NotFoundError()));
}

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => new NotFoundError())
    .then((card) => res.status(200).send(card))
    .catch(next);
}

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError())
    .then((card) => res.status(200).send(card))
    .catch(next);
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
