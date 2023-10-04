const db = require("../db/connection");

exports.fetchArticleById = async (id) => {
  try {
    let baseQuery = `SELECT
    a.*,
    (
        SELECT
            COUNT(*)
        FROM
            comments c
        WHERE
            c.article_id = a.article_id
    ) as comment_count
FROM
    articles a
WHERE
    a.article_id = $1;`;
    const { rows } = await db.query(baseQuery, [id]);

    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "article does not exist" });
    }
    return rows;
  } catch (error) {
    throw error;
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
    a.article_id
ORDER BY
    a.created_at DESC;`;
    const { rows } = await db.query(baseQuery);
    return rows;
  } catch (err) {
    throw err;
  }
};
