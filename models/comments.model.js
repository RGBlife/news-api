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

exports.insertComment = async (body, article_id) => {
  const timestamp = new Date();

  let insertQuery = `
    INSERT INTO
    comments (body, article_id, author, votes, created_at)
  VALUES
    (
        $1,
        $2,
        $3,
        0,
        $4
    )
    RETURNING *;
    `;
  const { rows } = await db.query(insertQuery, [
    body[0].body,
    article_id,
    body[0].author,
    timestamp,
  ]);
  return rows[0];
};
