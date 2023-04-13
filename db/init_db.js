const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

async function buildTables() {
  try {
    client.connect();

    await client.query(`
      drop table if exists categories;
      drop table if exists products;
      drop table if exists product_category;
      drop table if exists users;
      drop table if exists active_cart;
      drop table if exists orders;
    `)

    await client.query(`
      create table products (
          id serial primary key,
          name varchar(255) unique not null,
          description varchar(255) not null,
          price integer not null
      );
    `);

    // drop tables in correct order

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
