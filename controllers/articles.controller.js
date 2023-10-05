const {
  fetchArticleById,
  fetchArticles,
  updateArticle,
} = require("../models/articles.model");

exports.getArticleById = async ({ params: { article_id } }, res, next) => {
  try {
    const article = await fetchArticleById(article_id);
    res.status(200).send({ article });
  } catch (err) {
    next(err);
  }
};

exports.getArticles = async (req, res, next) => {
  try {
    const articles = await fetchArticles();
    res.status(200).send({ articles });
  } catch (err) {
    next(err);
  }
};

exports.patchArticle = async (req, res, next) => {
  try {
    const {
      params: { article_id },
      body: { inc_votes },
    } = req;
    await fetchArticleById(article_id);
    const patchedArticle = await updateArticle(article_id, inc_votes);
    res.status(200).send({ patchedArticle });
  } catch (err) {
    next(err);
  }
};
