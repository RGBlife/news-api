const { getArticles, getArticleById, patchArticle } = require('../controllers/articles.controller');
const { postComment, getCommentsByArticleId } = require('../controllers/comments.controller');

const articleRouter = require('express').Router();

articleRouter.route("/").get(getArticles)

articleRouter.route("/:article_id").get(getArticleById).patch(patchArticle)

articleRouter.route("/:article_id/comments").get(getCommentsByArticleId).post(postComment)

module.exports = articleRouter;