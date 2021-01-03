const router = require('express').Router();

const { 
    getAllThought,
    getThoughtById,
    addThought, 
    removeThought, 
    addReaction, 
    removeReaction
} = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/Thought
router
  .route('/')
  .get(getAllThought)
  .get(getThoughtById)
  .post(addThought);

// /api/comments/<pizzaId>
// /api/thought/<userId>
router
    .route('/:thoughtId')
    .post(addThought)
    .put(addThought)
    .delete(removeThought);

// /api/comments/<pizzaId>/<commentId>
// /api/comments/<userId>/<thoughtId>
// router
//     .route('/:userId/:thoughtId')
//     .put(addReaction)
//     .delete(removeThought);

router
    .route('/:thoughtId/:reactions')
    .post(addReaction)
    .delete(removeReaction);

router
    .route('/:reactionId')
    .delete(removeReaction);

module.exports = router;