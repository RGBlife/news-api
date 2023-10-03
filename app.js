const { getTopics } = require("./controllers/topics.controller");
const { pathNotFoundError, handleCustomErrors, handlePsqlErrors } = require("./controllers/errors.controller");
const { getArticleById } = require("./controllers/articles.controller");
const express = require("express");
const app = express();

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.all("/*", (req, res, next) => {
  pathNotFoundError(req, res, next);
});

app.use(handlePsqlErrors);
app.use(handleCustomErrors);

module.exports = app;
