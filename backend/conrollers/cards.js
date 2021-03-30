const CardModel = require('../models/card');
const { cardNotFound, errorResponse } = require('../utils/err-response');
const ForbiddenError = require('../errors/forbidden-err');

const getCards = (req, res, next) => CardModel.find({})
  .then((cards) => res.status(200).send(cards))
  .catch((err) => {
    errorResponse(err);
  })
  .catch(next);

const createCard = (req, res, next) => CardModel.create({ ...req.body, owner: req.user._id })
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    errorResponse(err);
  })
  .catch(next);

const deleteCard = (req, res, next) => CardModel.findById(req.params._id)
  .orFail(() => {
    cardNotFound();
  })
  .then((card) => {
    if (card.owner.toString() === req.user._id.toString()) {
      return CardModel.findByIdAndRemove(card._id)
        .then(() => res.status(200).send({ message: 'Карточка удалена' }));
    }
    throw new ForbiddenError('Нельзя удалить чужую карточку!');
  })
  .catch((err) => {
    errorResponse(err);
  })
  .catch(next);

const likeCard = (req, res, next) => CardModel.findByIdAndUpdate(
  req.params._id,
  { $addToSet: { likes: req.user } },
  { new: true },
)
  .orFail(() => {
    cardNotFound();
  })
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    errorResponse(err);
  })
  .catch(next);

const dislikeCard = (req, res, next) => CardModel.findByIdAndUpdate(
  req.params._id,
  { $pull: { likes: req.user } },
  { new: true },
)
  .orFail(() => {
    cardNotFound();
  })
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    errorResponse(err);
  })
  .catch(next);

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
