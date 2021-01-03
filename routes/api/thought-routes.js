const router = require('express').Router();
const { addComment, removeComment, addReply, removeReply} = require('../../controllers/thought-controller');

// /api/comments/<pizzaId>
// /api/thought/<userId>
router.route('/:usersId').post(addComment);

// /api/comments/<pizzaId>/<commentId>
// /api/comments/<userId>/<thoughtId>
router.route('/:userId/:thoughtId').put(addReply).delete(removeComment);

router.route('/:userId/:thoughtId/:replyId').delete(removeReply);

module.exports = router;