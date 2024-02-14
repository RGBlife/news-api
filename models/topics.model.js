const db = require("../db/connection");

exports.fetchTopics = async () => {
  let baseQuery = `SELECT * FROM topics`;
  const { rows } = await db.query(baseQuery);
  return rows;
};

exports.fetchTopicById = async (slug) => {
  try {
    let baseQuery = `SELECT * FROM topics WHERE $1 = slug`;
    const { rows } = await db.query(baseQuery, [slug]);
    if (rows.length === 0) {
      return Promise.reject({ status: 400, msg: "topic does not exist" });
    }
    return rows;
  } catch (error) {}
};

exports.insertTopic = async (slug, description) => {
  try {
    const baseQuery = `INSERT INTO topics (slug, description) VALUES ($1, $2) RETURNING *;`;
    const { rows } = await db.query(baseQuery, [slug, description]);
    if (rows.length > 0) {
      return rows[0];
    }
  } catch (error) {
    if (error.code === "23505") {
      return Promise.reject({ status: 422, msg: "Topic slug already exists" });
    }
  }
};
