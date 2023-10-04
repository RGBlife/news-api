exports.postComments = async (req, res, next) => {
  const {
    body,
    params: { article_id },
  } = req;
  console.log("body", body, "params", params);

  res.status(201).send("ok");
  //   const articleCheck = await fetchArticleById(article_id)
  //   const insertedComments = await insertComments(body);
};
