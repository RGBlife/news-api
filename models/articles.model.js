const db = require("../db/connection");

exports.fetchArticleById = async (id) => {
    let baseQuery = `SELECT * 
    FROM articles 
    WHERE article_id = $1;`;
    const { rows } = await db.query(baseQuery, [id]);

    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "article does not exist" });
    }
    return rows;

};
exports.fetchArticles = async () => {
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

};

exports.updateArticle = async (article_id, inc_votes) => {
    let updateQuery = `UPDATE
    articles
SET
    votes = votes + $1
WHERE
    article_id = $2
    RETURNING *;;`;
    const { rows } = await db.query(updateQuery, [inc_votes, article_id]);
    if (rows[0].length === 0) {
      throw { status: 404, msg: "article does not exist" };
    }
    return rows[0];

};
