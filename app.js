const { getTopics } = require("./controllers/topics.controller");
const {
  pathNotFoundError,
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./controllers/errors.controller");
const {
  getArticleById,
  getArticles,
} = require("./controllers/articles.controller");
const { postComments } = require("./controllers/comments.controller");
const { apiInfo } = require("./db/data/docs/api-docs");
const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.post("/api/articles/:article_id/comments", postComments);

app.get("/api", (req, res, next) => {
  res.status(200).send({ apiInfo });
});

app.all("/*", (req, res, next) => {
  pathNotFoundError(req, res, next);
});

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
