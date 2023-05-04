// queried from table 'products'
const client = require('../client');
const { User } = require('./user');

module.exports = {
  // add your database adapter fns here
  createProduct,
  getAllProducts,
  addProduct,
  removeProduct,
  getProductById,
  updateProduct,
};

/*
  pass in an object, so later you can pass in an array of objects and .map() through them
  to easily create multiple products with one function call
*/
async function createProduct({ name, description, imgURL, price, categoryID }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            INSERT INTO products(name, description, imgURL, price, "categoryId") 
            VALUES($1, $2, $3, $4, $5) 
            ON CONFLICT (name) DO NOTHING 
            RETURNING *;
          `,
      [name, description, imgURL, price, categoryID]
    );

    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
          SELECT *
          FROM products;
        `);

    return rows;
  } catch (error) {
    throw error;
  }
}

// function for administrator to add product to database
async function addProduct({ name, description, price, categoryID }) {
  const users = await User.getAllUsers();
  // under construction: have to add curUser variable that stores user info upon login
  const user = users.filter((entry) => entry.username == curUser.username);

  if (user.isAdmin) {
    try {
      const result = await createProduct({
        name,
        description,
        price,
        categoryID,
      });

      return result;
    } catch (error) {
      throw error;
    }
  } else {
    // return an error object to use in the front end to display the error message
    return {
      name: `InvalidAuthorizationError`,
      message: 'This account lacks administrative privilege',
    };
  }
}

async function removeProduct(id) {
  const users = await User.getAllUsers();
  // under construction: have to add curUser variable that stores user info upon login
  const user = users.filter((entry) => entry.username == curUser.username);

  if (user.isAdmin) {
    try {
      const {
        rows: [product],
      } = await client.query(
        `
                delete from products
                where products.id=$1
                returning *;
            `,
        [id]
      );

      // should return the deleted object
      return product;
    } catch (error) {
      throw error;
    }
  } else {
    return {
      name: `InvalidAuthorizationError`,
      message: 'This account lacks administrative privilege',
    };
  }
}

async function getProductById(productId) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
          SELECT *
          FROM products
          WHERE id=$1;
        `,
      [productId]
    );

    if (!product) {
      throw {
        name: 'ProductNotFoundError',
        message: 'Could not find a product with that productId',
      };
    }

    return product;
  } catch (error) {
    throw error;
  }
}

async function updateProduct({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(',');

  if (setString.length === 0) {
    return;
  }

  try {
    const { rows } = await client.query(
      `
            update products
            set ${setString}
            where id=${id}
            returning *
        `,
      Object.values(fields)
    );

    return rows;
  } catch (err) {
    throw err;
  }
}
