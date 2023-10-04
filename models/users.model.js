const db = require("../db/connection");

exports.fetchUsers = async () => {
  try {
    const usersQuery = `SELECT * FROM users`;
    const { rows } = await db.query(usersQuery);
    return rows
  } catch (error) {
    throw error;
  }
};
