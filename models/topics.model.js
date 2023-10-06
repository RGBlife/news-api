const db = require("../db/connection");

exports.fetchTopics = async () => {
  let baseQuery = `SELECT * FROM topics`;
  const { rows } = await db.query(baseQuery);
  return rows;
};

exports.fetchTopicById = async (slug) => {
  try {
    let baseQuery = `SELECT * FROM topics WHERE $1 = slug`;
    const {rows} = await db.query(baseQuery, [slug]);
    if (rows.length === 0) {
      return Promise.reject({ status: 400, msg: "topic does not exist" });
    }
    return rows;
  } catch (error) {}
};
