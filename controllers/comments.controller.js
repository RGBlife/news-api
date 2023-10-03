const { fetchCommentsByArticleId } = require("../models/comments.model");

exports.getCommentsByArticleId = async (req, res, next) => {
  try {
    const {
      params: { article_id },
    } = req;
    const articleComments = await fetchCommentsByArticleId(article_id);
    res.status(200).send({ articleComments });
  } catch (error) {
    next(error);
  }
};
