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
  } catch (error) {
    throw error;
  }
};

exports.fetchArticles = async (topic) => {
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
    LEFT JOIN comments AS c ON c.article_id = a.article_id`;

    const values = [];

    if (topic) {
      baseQuery += ` WHERE a.topic =$${values.length + 1}`;
      values.push(topic);
    }

    baseQuery +=` GROUP BY
    a.article_id
ORDER BY
    a.created_at DESC;`;


    const { rows } = await db.query(baseQuery, values);
    if (rows.length === 0) return Promise.reject({status: 404, msg: "Topic does not exist"})
    return rows;
  } catch (err) {
    throw err;
  }
};
