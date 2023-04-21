const {
  client,
  User,
  Categories,
  Products,
  Orders,
  // declare your model imports here
  // for example, User
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    await client.query(`  
      drop table if exists product_to_category;
      drop table if exists categories;
      drop table if exists product_category;
      drop table if exists active_cart;
      drop table if exists orders;
      drop table if exists products;
      drop table if exists users;

      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) UNIQUE NOT NULL,
        userEmail varchar(255) UNIQUE NOT NULL,
        userFirstName varchar(255) UNIQUE NOT NULL,
        userLastName varchar(255) UNIQUE NOT NULL,
        userLocation varchar(255) NOT NULL,
        active BOOLEAN DEFAULT true,
        isAdmin BOOLEAN DEFAULT false
      );

      create table products (
        id serial primary key,
        name varchar(255) unique not null,
        description varchar(255) not null,
        price integer not null
      );
    
      create table orders (
        orderID serial primary key,
        "orderUserID" integer references users(id),
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
   
      CREATE TABLE active_cart (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        name  varchar(255) NOT NULL,
        address varchar(255) NOT NULL
      );

      CREATE TABLE categories (
        categoryID SERIAL PRIMARY KEY,
        categoryname VARCHAR(50) UNIQUE NOT NULL
      );
   
      CREATE TABLE product_to_category (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "categoryId" INTEGER REFERENCES categories(categoryID),
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


    async function createInitialCategories() {
      console.log('starting to create categories...');
      const categoriesToCreate = [
        {
          categoryname: 'Classical'
        },
        {
          categoryname: 'Acoustic'
        },
        {
          categoryname: 'Electric'
        }
      ];
      const categories = await Promise.all(categoriesToCreate.map(Categories.createCategory));
      console.log('Categories Created: ', categories);
      console.log('Finished creating categories.');

    }

    async function createInitialProducts() {
      console.log('starting to create products...');

      const productsToCreate = [
        {
          name: 'Air Guitar',
          description: 'Sleek and lightweight design.',
          price: 35000
        },
        {
          name: 'The Chuck Berry',
          description: 'Gunny sack not included.',
          price: 599
        },
      ];
      const products = await Promise.all(productsToCreate.map(Products.createProduct));
      console.log('Products Created: ', products);
      console.log('Finished creating products.');
    }

    async function createInitialUsers() {
      console.log('starting to create users...')

      const usersToCreate = [
        {
          username: 'hendrix123',
          password: '123guitar',
          userEmail: 'jimi@hendrix.com',
          userFirstName: 'Jimi',
          userLastName: 'Hendrix',
          userLocation: 'Seattle, Washington'
        },
        {
          username: 'spaceman',
          password: '123queen',
          userEmail: 'brian@queen.com',
          userFirstName: 'Brian',
          userLastName: 'May',
          userLocation: 'London, England'
        },
        {
          username: 'santana',
          password: 'password123',
          userEmail: 'carlos@santana.com',
          userFirstName: 'Carlos',
          userLastName: 'Santana',
          userLocation: 'Jalisco, Mexico'
        },
      ]
      const users = await Promise.all( usersToCreate.map(User.createUser))
      console.log('Users Created: ', users);
      console.log('Finished creating users.');
    }

    async function createInitialOrders() {
      console.log('starting to create orders')

      const ordersToCreate = [
        {
          orderUserID: 1,
          orderShipName: 'Jimi Hendrix',
          ordershipAddress: '123 California Ave',
          orderCity: 'Seattle',
          orderState: 'Washington',
          orderZip: '12345',
          orderEmail: 'jimi@hendrix.com',
          orderShipped: true,
          orderTrackingNumber: 00004325
        }
      ]
      const orders = await Promise.all(ordersToCreate.map(Orders.createOrder))
      console.log('Orders Created: ', orders)
      console.log('Finished creating orders')
    }

    createInitialCategories()
    createInitialProducts()
    createInitialUsers()
    createInitialOrders()
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());