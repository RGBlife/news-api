const { getTopics } = require("./controllers/topics.controller");
const { pathNotFoundError, handleCustomErrors, handlePsqlErrors } = require("./controllers/errors.controller");
const { getArticleById } = require("./controllers/articles.controller");
const { getCommentsByArticleId } = require("./controllers/comments.controller");
const { apiInfo } = require("./db/data/docs/api-docs");
const express = require("express");
const app = express();

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.get("/api", (req, res, next) => {
  res.status(200).send({ apiInfo });
});

app.all("/*", (req, res, next) => {
  pathNotFoundError(req, res, next);
});

app.use(handlePsqlErrors);
app.use(handleCustomErrors);

module.exports = app;
