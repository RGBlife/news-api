const { fetchTopics, insertTopic } = require("../models/topics.model");

exports.getTopics = async (req, res, next) => {
  try {
    const topics = await fetchTopics();
    res.status(200).send({ topics });
  } catch (err) {
    next(err);
  }
};

exports.postTopic = async ({ body }, res, next) => {
  try {
    const { slug, description } = body;

    if (slug === undefined || description === undefined) {
      return next({ status: 400, msg: "description or slug is missing" });
    }

    const response = await insertTopic(slug, description);
    res.status(201).send({ response });
  } catch (err) {
    next(err);
  }
};
