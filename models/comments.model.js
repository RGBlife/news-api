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
    body[0].username,
    timestamp,
  ]);
  return rows[0];
};

exports.fetchCommentByCommentId = async (comment_id) => {
  let commentQuery = `SELECT *
      FROM
          comments
      WHERE
          comments.comment_id = $1;`;
  const { rows } = await db.query(commentQuery, [comment_id]);

  if (rows.length === 0) {
    return Promise.reject({ status: 404, msg: "comment does not exist" });
  }
  return rows;
};

exports.removeCommentById = async (comment_id) => {
  let commentQuery = `DELETE FROM comments
      WHERE
          comments.comment_id = $1;`;
  await db.query(commentQuery, [comment_id]);
};

exports.updateCommentById = async (comment_id, inc_votes) => {
  let updateQuery = `UPDATE
    comments
SET
    votes = votes + $1
WHERE
    comment_id = $2
    RETURNING *;`;
  const { rows } = await db.query(updateQuery, [inc_votes, comment_id]);
  return rows[0];
};