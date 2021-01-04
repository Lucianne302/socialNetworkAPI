const router = require('express').Router();

const { 
    getAllThought,
    getThoughtById,
    updateThoughtById, 
    removeThoughtById, 
    addReaction, 
    removeReactionById
} = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/Thought
router
  .route('/')
  .get(getAllThought)
  .get(getThoughtById)
  //.post(addThought);

// /api/comments/<pizzaId>
// /api/thought/<thoughtId>
router
    .route('/:thoughtId')
    //.post(addThought)
    .put(updateThoughtById)
    .delete(removeThoughtById);

// /api/comments/<pizzaId>/<commentId>
// /api/comments/<userId>/<thoughtId>
router
    .route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(removeThought);

router
    .route('/:thoughtId/:reactions')
    .post(addReaction)
    .put(addReaction)
    .delete(removeReaction);

router
    .route('/:reactionId')
    .delete(removeReactionById);

module.exports = router;