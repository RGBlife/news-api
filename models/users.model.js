const db = require("../db/connection");

exports.fetchUsers = async () => {
  const usersQuery = `SELECT * FROM users`;
  const { rows } = await db.query(usersQuery);
  return rows;
};

exports.fetchUserByUsername = async (username) => {
  const userQuery = `SELECT * FROM users WHERE username = $1`;
  const { rows } = await db.query(userQuery, [username]);
  if (rows.length === 0) {
    return Promise.reject({ status: 404, msg: "username does not exist." });
  }
  return rows[0];
};
