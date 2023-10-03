const db = require("../db/connection");

exports.fetchArticleById = async (id) => {
  try {
    let baseQuery = `SELECT * 
    FROM articles 
    WHERE article_id = $1;`;
    const { rows } = await db.query(baseQuery, [id]);

    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "article does not exist" });
    }
    return rows;
  } catch (err) {
    throw err;
  }
};
exports.fetchArticles = async () => {
  try {
    let baseQuery = `SELECT
    a.author,
    a.title,
    a.article_id,
    a.topic,
    a.created_at,
    a.votes,
    a.article_img_url,
    count(c.comment_id) AS comment_count
FROM
    articles AS a
    LEFT JOIN comments AS c ON c.article_id = a.article_id
GROUP BY
    a.author,
    a.title,
    a.article_id,
    a.topic,
    a.created_at,
    a.votes,
    a.article_img_url
ORDER BY
    a.created_at DESC;`;
    const { rows } = await db.query(baseQuery);

    return rows;
  } catch (err) {
    throw err;
  }
};
