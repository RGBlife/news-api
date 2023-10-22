const {
  fetchCommentsByArticleId,
  insertComment,
  fetchCommentByCommentId,
  removeCommentById,
  updateCommentById,
} = require("../models/comments.model");
const { fetchArticleById } = require("../models/articles.model");

const { validatePostBody } = require("./utils");

exports.getCommentsByArticleId = async (req, res, next) => {
  try {
    const {
      params: { article_id },
    } = req;

    const { query } = req;

 

    await fetchArticleById(article_id);

    const articleComments = await fetchCommentsByArticleId(article_id, query);

    // destructure articles, totalCount

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

exports.deleteCommentById = async (req, res, next) => {
  try {
    const {
      params: { comment_id },
    } = req;
    await fetchCommentByCommentId(comment_id);
    const deletedComment = await removeCommentById(comment_id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
exports.patchCommentById = async (req, res, next) => {
  try {
    const {
      params: { comment_id },
      body: { inc_votes },
    } = req;
    await fetchCommentByCommentId(comment_id);
    const updatedComment = await updateCommentById(comment_id, inc_votes);
    res.status(200).send({ updatedComment });
  } catch (error) {
    next(error);
  }
};
