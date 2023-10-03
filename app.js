const { getTopics } = require("./controllers/topics.controller");
const { pathNotFoundError } = require("./controllers/errors.controller");
const { apiInfo } = require("./db/data/docs/api-docs");
const express = require("express");
const app = express();

app.get("/api/topics", getTopics);

app.get("/api", (req, res, next) => {
  res.status(200).send({ apiInfo });
});

app.all("/*", (req, res, next) => {
  pathNotFoundError(req, res, next);
});

module.exports = app;
