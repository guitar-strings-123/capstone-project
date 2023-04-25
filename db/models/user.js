// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');
// salt_count increased to 11 for extra security without too much speed loss
const SALT_COUNT = 11;

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  getUserByUsername,
  getUser,
};

async function createUser({
  username,
  password,
  userEmail,
  userFirstName,
  userLastName,
  userLocation,
  isAdmin,
}) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password, userEmail, userFirstName, userLastName, userLocation, isAdmin) 
        VALUES($1, $2, $3, $4, $5, $6, $7) 
        ON CONFLICT (username) DO NOTHING 
        RETURNING *;
      `,
      [
        username,
        hashedPassword,
        userEmail,
        userFirstName,
        userLastName,
        userLocation,
        isAdmin,
      ]
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
async function getUser({ username, password }) {
  if (!username || !password) {
    return;
  }

  try {
    const user = await getUserByUsername(username);
    if (!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username = $1;
    `,
      [username]
    );
    if (!rows || !rows.length) return null;
    const [user] = rows;
    return user;
  } catch (error) {
    console.error(error);
  }
}
