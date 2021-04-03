const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../conrollers/cards');
const celebrateValidation = require('../middlewares/celebrate-validation');

router.get('/cards', getCards);
router.post('/cards', celebrateValidation, createCard);
router.delete('/cards/:_id', celebrateValidation, deleteCard);
router.put('/cards/:_id/likes', celebrateValidation, likeCard);
router.delete('/cards/:_id/likes', celebrateValidation, dislikeCard);
module.exports = router;
