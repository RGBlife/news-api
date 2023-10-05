const db = require("../db/connection");

exports.fetchTopics = async () => {
  let baseQuery = `SELECT * FROM topics`;
  const { rows } = await db.query(baseQuery);
  return rows;
};

