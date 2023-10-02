const { getTopics } = require("./controllers/topics.controller");
const {pathNotFoundError} = require("./controllers/errors.controller")
const express = require("express");
const app = express();

app.get("/api/topics", getTopics);

app.all("/*", (req, res, next) => {
    pathNotFoundError(req, res, next)
});

module.exports = app;
