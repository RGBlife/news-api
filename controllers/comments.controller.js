const {
  fetchCommentsByArticleId,
  insertComment,
} = require("../models/comments.model");
const { fetchArticleById } = require("../models/articles.model");

const { validatePostBody } = require("./utils");

exports.getCommentsByArticleId = async (req, res, next) => {
  try {
    const {
      params: { article_id },
    } = req;

    await fetchArticleById(article_id);

    const articleComments = await fetchCommentsByArticleId(article_id);

    res.status(200).send({ articleComments });
  } catch (error) {
    next(error);
  }
};

exports.postComment = async (req, res, next) => {
  try {
    const {
      body,
      params: { article_id },
    } = req;


    await fetchArticleById(article_id);

    const hasErrors = validatePostBody(body[0]);
    if (hasErrors) return next({ status: 400, msg: hasErrors });

    const insertedComment = await insertComment(body, article_id);

    res.status(201).send({ insertedComment });
  } catch (error) {
    next(error);
  }
};
