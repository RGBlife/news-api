exports.validatePostBody = (body) => {
  if (!body || Object.keys(body).length === 0) {
    return "Request body is missing";
  }

  if (!body.author) {
    return "Author is required";
  }

  if (!body.body) {
    return "body text is required";
  }

  return null;
};
exports.validatePostArticleBody = (body) => {
  if (!body || Object.keys(body).length === 0) {
    return "Request body is missing";
  }

  if (!body.author || !body.title || !body.body || !body.topic) {
    return "Request body format is incorrect, ensure it has author, title, body, topic";
  }

  return null;
};
