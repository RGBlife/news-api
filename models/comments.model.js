const db = require("../db/connection");

exports.fetchCommentsByArticleId = async (article_id) => {
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

  return rows;
};
