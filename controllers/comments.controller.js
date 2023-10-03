const { fetchCommentsByArticleId } = require("../models/comments.model");
const { fetchArticleById } = require("../models/articles.model");

exports.getCommentsByArticleId = async (req, res, next) => {
  try {
    const {
      params: { article_id },
    } = req;

    const articleCheck = await fetchArticleById(article_id);

    if (articleCheck.length === 0) {
      return Promise.reject({ status: 404, msg: "article does not exist" });
    }

    const articleComments = await fetchCommentsByArticleId(article_id);

    res.status(200).send({ articleComments });
  } catch (error) {
    const { status, articleComments } = error;
    if (status === 200) {
      res.status(200).send({ articleComments });
    } else {
      next(error);
    }
  }
};
