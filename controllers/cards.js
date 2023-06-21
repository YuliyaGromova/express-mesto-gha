/* eslint-disable quotes */
/* eslint-disable object-curly-spacing */
/* eslint-disable semi */
const Card = require('../models/card');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    next(err);
  }
};

const createCard = (req, res, next) => {
  req.body.owner = req.user._id;
  Card.create({
    ...req.body,
  })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((item) => {
      if (String(item.owner) === String(req.user._id)) {
        Card.deleteOne(item)
          .orFail(() => new Error('Not found'))
          .then(() => res.status(200).send({ message: "Удаление карточки выполнено"}))
          .catch(next);
      } else {
        res.status(403).send({ message: "Нельзя удалить чужую карточку"})
      }
    })
    .catch(next);
}

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => new Error('Not found'))
    .then((card) => res.status(200).send(card))
    .catch(next);
}

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('Not found'))
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
