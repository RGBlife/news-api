const db = require("../db/connection");

exports.fetchArticleById = async (id) => {
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
  return rows[0];
};

exports.fetchArticles = async (sort_by, order, topic) => {
  if (topic) {
    const topicQuery = `SELECT * FROM topics WHERE topics.slug = $1`;
    const topicCheck = await db.query(topicQuery, [topic]);
    if (topicCheck.rows.length === 0)
      return Promise.reject({ status: 404, msg: "Topic does not exist" });
  }

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
`;

  const values = [];

  if (topic) {
    baseQuery += ` WHERE a.topic =$${values.length + 1}`;
    values.push(topic);
  }

  baseQuery += ` GROUP BY
  a.article_id`;

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

  const { rows } = await db.query(baseQuery, values);
  return rows;
};

exports.updateArticle = async (article_id, inc_votes) => {
  let updateQuery = `UPDATE
    articles
SET
    votes = votes + $1
WHERE
    article_id = $2
    RETURNING *;`;
  const { rows } = await db.query(updateQuery, [inc_votes, article_id]);
  if (rows[0].length === 0) {
    throw { status: 404, msg: "article does not exist" };
  }
  return rows[0];
};
