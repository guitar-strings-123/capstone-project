// grab our db client connection to use with our adapters
const client = require("../client");

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
};

async function createUser({
  username,
  password,
  userEmail,
  userFirstName,
  userLastName,
  userLocation,
}) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password, userEmail, userFirstName, userLastName, userLocation) 
        VALUES($1, $2, $3, $4, $5, $6) 
        ON CONFLICT (username) DO NOTHING 
        RETURNING *;
      `,
      [username, password, userEmail, userFirstName, userLastName, userLocation]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM users;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}
