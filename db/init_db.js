const {
  client,
  User,
  Products,
  // declare your model imports here
  // for example, User
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    await client.query(`  
      drop table if exsists product-to-category;
      drop table if exists categories;
      drop table if exists products;
      drop table if exists product_category;
      drop table if exists users;
      drop table if exists active_cart;
      drop table if exists orders;
    
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
    

    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) UNIQUE NOT NULL,
      userEmail varchar(255) UNIQUE NOT NULL,
      userFirstName varchar(255) UNIQUE NOT NULL,
      userLastName varchar(255) UNIQUE NOT NULL,
      userLocation varchar(255) NOT NULL,
      active BOOLEAN DEFAULT true
    );
   
    CREATE TABLE active_cart (
      id SERIAL PRIMARY KEY,
      username varchar(255) UNIQUE NOT NULL,
      name  varchar(255) NOT NULL,
      address varchar(255) NOT NULL
    );

    CREATE table categories (
      categoryID SERIAL PRIMARY KEY,
      categoryname VARCHAR(50) UNIQUE NOT NULL
    );
   
       CREATE TABLE product-to-category (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "categoryId" INTEGER REFERENCES categories(id),
        UNIQUE ("productId", "categoryId")
      );
  `);

    console.log('finished dropping and creating tables');
    // build tables in correct order
  } catch (error) {
    console.log('error dropping tables');
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
