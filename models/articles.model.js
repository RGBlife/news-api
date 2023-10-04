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
exports.fetchArticles = async (sort_by, order) => {
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
    a.article_id`;

    const validColumns = [
      "author",
      "title",
      "article_id",
      "topic",
      "created_at",
      "votes",
      "article_img_url",
      "comment_count",
    ];
    const sortOrder = ["ASC", "DESC"];
    if (sort_by) {
      if (validColumns.includes(sort_by)) {
        baseQuery += ` ORDER BY a.${sort_by}`;
      } else {
        return Promise.reject({ status: 400, msg: "Invalid sort_by column" });
      }
    } else {
      baseQuery += ` ORDER BY a.created_at`;
    }

    if (order) {
      if (sortOrder.includes(order.toUpperCase())) {
        baseQuery += ` ${order.toUpperCase()};`;
      } else {
        return Promise.reject({
          status: 400,
          msg: "Order must be either ASC or DESC",
        });
      }
    } else {
      baseQuery += ` DESC;`;
    }

    const { rows } = await db.query(baseQuery);

    return rows;
  } catch (err) {
    throw err;
  }
};
