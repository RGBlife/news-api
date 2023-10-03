const db = require("../db/connection");
const { fetchArticleById } = require("./articles.model");

exports.fetchCommentsByArticleId = async (article_id) => {
  try {
    const articleCheck = await fetchArticleById(article_id);

    if (articleCheck.length === 0) {
      return Promise.reject({ status: 404, msg: "article does not exist" });
    }

    let commentsQuery = `SELECT
    c.comment_id,
    c.votes,
    c.created_at,
    c.author,
    c.body,
    c.article_id
FROM
    comments AS c
    LEFT JOIN articles AS a ON a.article_id = c.article_id
WHERE
    c.article_id = $1
GROUP By
    c.comment_id,
    a.article_id
ORDER BY
    c.created_at;`;
    const { rows } = await db.query(commentsQuery, [article_id]);
    if (rows.length === 0) {
      return Promise.reject({
        status: 200,
        msg: "article does not have any comments",
      });
    }

    return rows;
  } catch (error) {
    throw error;
  }
};
