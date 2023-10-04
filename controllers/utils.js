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
