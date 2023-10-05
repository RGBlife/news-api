const apiRouter = require("express").Router();
const { apiInfo } = require("../db/data/docs/api-docs");
const userRouter = require("./users-router");
const articleRouter = require("./articles-router");
const commentRouter = require("./comments-router");
const topicRouter = require("./topics-router");


apiRouter.use("/users", userRouter);

apiRouter.use("/topics", topicRouter);

apiRouter.use("/comments", commentRouter);

apiRouter.use("/articles", articleRouter);

apiRouter.get("/", (req, res, next) => {
  res.status(200).send({ apiInfo });
});

module.exports = apiRouter;
