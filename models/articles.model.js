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

exports.fetchArticles = async (query, limit, offset) => {
  const { sort_by, order, topic } = query;

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

  let countQuery = `SELECT COUNT(*) FROM articles AS a`;
  const countValues = [];

  if (topic) {
    baseQuery += ` WHERE a.topic =$${values.length + 1}`;
    values.push(topic);
    countQuery += ` WHERE a.topic = $1`;
    countValues.push(topic);
  }

  const countResult = await db.query(countQuery, countValues);
  const totalCount = parseInt(countResult.rows[0].count);

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
      baseQuery += ` ${order.toUpperCase()}`;
    } else {
      return Promise.reject({
        status: 400,
        msg: "Order must be either ASC or DESC",
      });
    }
  } else {
    baseQuery += ` DESC`;
  }
  baseQuery += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
  values.push(limit, offset);

  const { rows } = await db.query(baseQuery, values);
  return { articles: rows, totalCount };
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

exports.insertArticle = async (requestBody) => {
  let { author, title, body, topic, article_img_url } = requestBody;
  const timestamp = new Date();

  if (!article_img_url) {
    article_img_url = `https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80`;
  }

  const values = [title, topic, author, body, timestamp, article_img_url];

  let insertQuery = `
    INSERT INTO
    articles (title, topic, author, body, created_at, votes, article_img_url)
    VALUES
    (
        $1,
        $2,
        $3,
        $4,
        $5,
        0,
        $6
        )
        RETURNING *;
        `;
  const { rows } = await db.query(insertQuery, values);
  return rows[0];
};
