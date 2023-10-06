const { deleteCommentById, patchCommentById } = require('../controllers/comments.controller');
const commentRouter = require('express').Router();

commentRouter.route("/:comment_id").patch(patchCommentById).delete(deleteCommentById)

module.exports = commentRouter;