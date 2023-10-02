const db = require("../db/connection");

exports.fetchTopics = async () => {
  try {
    let baseQuery = `SELECT * FROM topics`;
    const { rows } = await db.query(baseQuery);
    return rows;
  } catch (error) {
    console.log("err at model: ", error);
  }
};

exports.fetchApiInfo = async () => {
  const apiInfo = await res.status(200).send(apiInfo);
};