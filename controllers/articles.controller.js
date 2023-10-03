const { fetchArticleById, fetchArticles } = require("../models/articles.model");
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
    const article = await fetchArticles();
    res.status(200).send({ article });
  } catch (err) {
    next(err);
  }
};
