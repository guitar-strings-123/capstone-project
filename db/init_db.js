const {
  client,
  User,
  Categories,
  Products,
  Orders,
  ActiveCart,
  // declare your model imports here
  // for example, User
} = require('./');
const { getAllUsers } = require('./models/user');

async function buildTables() {
  try {
    client.connect();

    await client.query(`  
      drop table if exists product_to_category;
      drop table if exists active_cart_items;
      drop table if exists products;
      drop table if exists categories;
      drop table if exists product_category;
      drop table if exists active_cart;
      drop table if exists orders;
      drop table if exists users;

      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) UNIQUE NOT NULL,
        userEmail varchar(255) UNIQUE NOT NULL,
        userFirstName varchar(255) UNIQUE NOT NULL,
        userLastName varchar(255) UNIQUE NOT NULL,
        userAddress varchar(255) NOT NULL,
        userCity varchar(255) NOT NULL,
        userState varchar(255) NOT NULL,
        userZip varchar(255) NOT NULL,
        active BOOLEAN DEFAULT true,
        isAdmin BOOLEAN DEFAULT false
       
      );
      
      CREATE TABLE categories (
        categoryID SERIAL PRIMARY KEY,
        categoryname VARCHAR(50) UNIQUE NOT NULL
      );
 
      create table products (
        id serial primary key,
        name varchar(255) unique not null,
        description varchar(255) not null,
        imgURL varchar(255),
        price integer not null,
        "categoryId" integer references categories(categoryID)
      );
    
      create table orders (
        orderID serial primary key,
        "orderUserID" integer references users(id),
        orderShipName varchar(255) not null,
        orderShipAddress varchar(255) not null,
        orderShipAddress2 varchar(255),
        orderCity varchar(255) not null,
        orderState varchar(255) not null,
        orderZip integer,
        orderEmail varchar(255) not null,
        orderShipped BOOLEAN default false,
        orderTrackingNumber integer,
        orderProducts integer[][]
      );
   
      CREATE TABLE active_cart (
        id INTEGER PRIMARY KEY,
        "user_id" INTEGER REFERENCES users(id)
      );

      CREATE TABLE active_cart_items (
        id SERIAL PRIMARY KEY,
        "active_cart_id" INTEGER REFERENCES active_cart(id),
        "product_id" INTEGER REFERENCES products(id),
        quantity INTEGER
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
          categoryname: 'Classical',
        },
        {
          categoryname: 'Acoustic',
        },
        {
          categoryname: 'Electric',
        },
      ];
      const categories = await Promise.all(
        categoriesToCreate.map(Categories.createCategory)
      );
      console.log('Categories Created: ', categories);
      console.log('Finished creating categories.');
    }

    async function createInitialProducts() {
      console.log('starting to create products...');

      const productsToCreate = [
        {
          name: 'Air Guitar',
          description: 'Sleek and lightweight design.',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 0,
          categoryID: 2,
        },
        {
          name: 'The Chuck Berry',
          description: 'Gunny sack not included.',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 599,
          categoryID: 2,
        },
        {
          name: 'Fender Strat',
          description: 'Made in USA.',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 1500,
          categoryID: 2,
        },
        {
          name: 'Gibson Les Paul',
          description: 'The OG shredder.',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 2300,
          categoryID: 2,
        },
        {
          name: 'Jackson Dinky',
          description: 'Smooth playing.',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 666,
          categoryID: 2,
        },
        {
          name: 'FGN Illiad',
          description: 'Japanese quality at a fraction of the price.',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 599,
          categoryID: 2,
        },
        {
          name: 'B.C. Rich',
          description: 'The mall ninja of guitars.',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 333,
          categoryID: 2,
        },
        {
          name: 'Harmony Juno',
          description: 'American made, dual p90s.',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 1100,
          categoryID: 2,
        },
        {
          name: 'Harmony Rocket',
          description: 'American made, dual p90s.',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 1100,
          categoryID: 2,
        },
        {
          name: 'Epihpone Les Paul',
          description: 'Pretty much the same but without the name',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 499,
          categoryID: 2,
        },
        {
          name: 'Jackson Flying V',
          description: 'Not reccomended for actual flight',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 1200,
          categoryID: 2,
        },
        {
          name: 'Fender Acoustisonic',
          description: 'Who is this for?',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 1300,
          categoryID: 2,
        },
        {
          name: 'Fender HM Strat',
          description: 'Start for metal or whatever',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 1400,
          categoryID: 2,
        },
        {
          name: 'Taylor 210CE',
          description: 'Acoustic',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 1100,
          categoryID: 2,
        },
        {
          name: 'Schecter C-1',
          description: 'Yuh',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 1100,
          categoryID: 2,
        },
        {
          name: 'Gretsch Penguin',
          description: 'Oh Lawd',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 2300,
          categoryID: 2,
        },
        {
          name: 'EVH Wolgang Standard',
          description: 'Functional',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 550,
          categoryID: 2,
        },
        {
          name: 'PRS SE Classic',
          description: 'Paul Reed Smith',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 800,
          categoryID: 2,
        },
        {
          name: 'Fender American Professional',
          description: 'For the professional american',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 1100,
          categoryID: 2,
        },
        {
          name: 'Fender Telecaster',
          description: 'Work Horse',
          imgURL:
            'https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png',
          price: 1100,
          categoryID: 2,
        },

        {
          name: 'Martin D28',
          description: 'Martin.',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 2800,
          categoryID: 2,
        },
        {
          name: 'Alverez RF26',
          description: 'Affordable',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 250,
          categoryID: 2,
        },
        {
          name: 'Blueridge BR-183',
          description: 'Historic',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 1700,
          categoryID: 2,
        },
        {
          name: 'Breedlove Oregon CE',
          description: 'Colorful',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 3000,
          categoryID: 2,
        },
        {
          name: 'Taylor 417 Grand Pacific',
          description: 'Sings',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 3000,
          categoryID: 2,
        },
        {
          name: 'Fender Precision Bass',
          description: 'Accurate',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 1100,
          categoryID: 2,
        },
        {
          name: 'Fender Jazz Bass',
          description: 'Jazzy',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 1100,
          categoryID: 2,
        },
        {
          name: 'Gibson SG',
          description: 'Thunderstruck',
          imgURL:
            'https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg',
          price: 1100,
          categoryID: 2,
        },
      ];
      const products = await Promise.all(
        productsToCreate.map(Products.createProduct)
      );
      console.log('Products Created: ', products);
      console.log('Finished creating products.');
    }

    async function createInitialUsers() {
      console.log('starting to create users...');

      const usersToCreate = [
        {
          username: 'hendrix123',
          password: '123guitar',
          userEmail: 'jimi@hendrix.com',
          userFirstName: 'Jimi',
          userLastName: 'Hendrix',
          userAddress: '1524A Haight St.',
          userCity: 'Seattle',
          userState: 'Washington',
          userZip: '98101'
        },
        {
          username: 'spaceman',
          password: '123queen',
          userEmail: 'brian@queen.com',
          userFirstName: 'Brian',
          userLastName: 'May',
          userAddress: 'Oxford St.',
          userCity: 'London',
          userState: 'England',
          userZip: 'E1 7AY'
        },
        {
          username: 'santana',
          password: 'password123',
          userEmail: 'carlos@santana.com',
          userFirstName: 'Carlos',
          userLastName: 'Santana',
          userAddress: '2115 Jalisco St.',
          userCity: 'Jalisco',
          userState: 'Mexico',
          userZip: '78954'
        },
        {
          username: 'bob',
          password: 'bob',
          userEmail: 'bob@bob.com',
          userFirstName: 'bob',
          userLastName: 'bob',
          userAddress: 'bob St.',
          userCity: 'bob city',
          userState: 'bob',
          userZip: '13013',
          isAdmin: true,
        },
      ];
      const users = await Promise.all(usersToCreate.map(User.createUser));
      console.log('Users Created: ', users);
      console.log('Finished creating users.');
    }

    async function createInitialOrders() {
      console.log('starting to create orders');

      const ordersToCreate = [
        {
          orderUserID: 3,
          orderShipName: 'Test Order',
          orderShipAddress: 'test',
          orderCity: 'test',
          orderState: 'test',
          orderZip: 12345,
          orderEmail: 'test@test.com',
          orderShipped: true,
          orderTrackingNumber: 4325,
          orderProducts: [[1,2],[2,1]]
        },
        {
          orderUserID: 2,
          orderShipName: 'Test Order',
          orderShipAddress: 'test',
          orderCity: 'test',
          orderState: 'test',
          orderZip: 32134,
          orderEmail: 'test',
          orderShipped: false,
          orderTrackingNumber: 4326,
          orderProducts: [[2,1],[3,1]]
        },
      ];
      const orders = await Promise.all(ordersToCreate.map(Orders.createOrder));
      console.log('Orders Created: ', orders);
      console.log('Finished creating orders');
    }

    async function createInitialCarts() {
      console.log('starting to create carts');
      const users = await getAllUsers();

      let cartsToCreate = [];
      for (let i = 0; i < users.length; i++) {
        cartsToCreate[i] = users[i].id
      }

      const itemsInCarts = [
        {
          cartId: 1,
          productId: 1,
          quantity: 3,
        },
        {
          cartId: 1,
          productId: 2,
          quantity: 5,
        },
      ];
      const carts = await Promise.all(
        cartsToCreate.map(ActiveCart.createActiveCart)
      );
      const items = await Promise.all(
        itemsInCarts.map(ActiveCart.addItemToCart)
      );
      console.log('Carts created ', carts, items);
      console.log('finished creating carts');
    }

    await createInitialCategories();
    await createInitialProducts();
    await createInitialUsers();
    await createInitialOrders();
    await createInitialCarts();

    console.log('finished seeding data');
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
