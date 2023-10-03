const db = require("../db/connection");

exports.fetchArticleById = async (id) => {
  try {
    let baseQuery = `SELECT * FROM articles WHERE article_id = $1;`;
    const { rows } = await db.query(baseQuery, [id]);

    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "article does not exist" });
    }
    return rows;
  } catch (error) {
    throw error;
  }
};
