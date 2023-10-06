const {
  fetchArticleById,
  fetchArticles,
  updateArticle,
  insertArticle,
} = require("../models/articles.model");

const { fetchUserByUsername } = require("../models/users.model");
const { fetchTopicById } = require("../models/topics.model");
const { validatePostArticleBody } = require("./utils");

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
    const { query } = req;

    const limit = parseInt(query.limit) || 10;
    const page = parseInt(query.p) || 1;
    const offset = (page - 1) * limit;

    const { articles, totalCount } = await fetchArticles(query, limit, offset);
    res.status(200).send({ articles, totalCount });
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

exports.postArticle = async ({ body }, res, next) => {
  try {
    const { author, topic } = body;
    await fetchUserByUsername(author);
    await fetchTopicById(topic);

    const hasErrors = validatePostArticleBody(body);
    if (hasErrors) return next({ status: 400, msg: hasErrors });

    const { article_id } = await insertArticle(body);
    const insertedArticle = await fetchArticleById(article_id);

    res.status(201).send({ insertedArticle });
  } catch (error) {
    next(error);
  }
};
