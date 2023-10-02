const db = require("../db/connection");

exports.fetchTopics = async () => {
  try {
    let baseQuery = `SELECT * FROM topics`;
    const { rows } = await db.query(baseQuery);
    return rows;
  } catch (error) {
    console.log("err at model: ", err);
  }
};
