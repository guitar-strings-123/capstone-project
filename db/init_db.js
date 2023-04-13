const {
  client,
  // declare your model imports here
  // for example, User
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    await client.query(`
      create table products (
          id serial primary key,
          name varchar(255) unique not null,
          description varchar(255) not null,
          price integer not null
      );
      create table orders (
        orderID serial primary key,
        "orderUserID" references users(id),
        orderShipName VARCHAR(100),
        orderShipAddress VARCHAR(100),
        orderShipAddress2 VARCHAR(100),
        orderCity VARCHAR(100),
        orderState VARCHAR(100),
        orderZip VARCHAR(10),
        orderEmail VARCHAR(100),
        orderShipped BOOLEAN default false,
        orderTrackingNumber VARCHAR(80)
      );
    `);

    // drop tables in correct order
    await client.query(`
    DROP TABLES IF EXISTS Users;
    DROP TABLES IF EXISTS UserID;
    DROP TABLES IF EXISTS ActiveCart;
    DROP TABLES IF EXISTS Categories;
    DROP TABLES IF EXISTS Orders;

    CREATE TABLE Users (
      id SERIAL PRIMARY KEY,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) UNIQUE NOT NULL,
      userEmail varchar(255) UNIQUE NOT NULL,
      userFirstName varchar(255) UNIQUE NOT NULL,
      userLastName varchar(255) UNIQUE NOT NULL,
      userLocation varchar(255) NOT NULL,
      active BOOLEAN DEFAULT true

    );
    `)
    console.log('finished dropping and creating tables')
    // build tables in correct order

  } catch (error) {
    console.log('error dropping tables')
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
