const router = require('express').Router();

const { 
    getAllThought,
    getThoughtById,
    updateThoughtById, 
    removeThoughtById, 
    //removeThought,
    addReaction, 
    //removeReaction,
    removeReactionById, 
    addThought
} = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/Thought
router
  .route('/')
  .get(getAllThought)
  .get(getThoughtById)
  .post(addThought);

// /api/comments/<pizzaId>
// /api/thought/<thoughtId>
router
    .route('/:id')
    .get(getThoughtById)
    //.post(addThought)
    .put(updateThoughtById)
    .delete(removeThoughtById);

// /api/comments/<pizzaId>/<commentId>
// /api/comments/<userId>/<thoughtId>
// router
//     .route('/:thoughtId/:thoughtId')
    //.put(addReaction)
    //.delete(removeThought);

router
    .route('/:id/:reactions')
    .post(addReaction)
    //.put(addReaction)
    //.delete(removeReaction);

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReactionById);

module.exports = router;