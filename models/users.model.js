const db = require("../db/connection");

exports.fetchUsers = async () => {
  const usersQuery = `SELECT * FROM users`;
  const { rows } = await db.query(usersQuery);
  return rows;
};
