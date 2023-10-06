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
    const {
      query: { sort_by, order, topic },
    } = req;
    const articles = await fetchArticles(sort_by, order, topic);
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
