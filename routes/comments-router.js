const { deleteCommentById } = require('../controllers/comments.controller');
const commentRouter = require('express').Router();

commentRouter.route("/:comment_id").delete(deleteCommentById)

module.exports = commentRouter;