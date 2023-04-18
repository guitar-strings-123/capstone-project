// queried from table 'products'
const client = require("../client");

module.exports = {
  // add your database adapter fns here
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct
};

/*
  pass in an object, so later you can pass in an array of objects and .map() through them
  to easily create multiple products with one function call
*/
async function createProduct({ name, description, price }) {
  try {
    const { rows: [product] } = await client.query(
      `
            INSERT INTO products(name, description, price) 
            VALUES($1, $2, $3) 
            ON CONFLICT (name) DO NOTHING 
            RETURNING *;
          `,
      [name, description, price]
    );

    return product;
  } catch (error) {
    throw error;
  }
};

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
};

async function getProductById(productId) {
  try {
    const { rows: [product] } = await client.query(`
      SELECT *
      FROM products
      WHERE id=$1;
    `, [productId]);

    if (!product) {
      throw {
        name: "ProductNotFoundError",
        message: "Could not find a product with that productId"
      };
    }

    return product;
  } catch (error) {
    throw error;
  }
}

async function updateProduct({ id, ...fields }) {

  const setString = Object.keys(fields).map(
    (key, index) => `"${key}"=$${index + 1}`
  ).join(',')

  if (setString.length === 0) {
    return
  }

  try {
    const { rows } = await client.query(`
        update products
        set ${setString}
        where id=${id}
        returning *
    `, Object.values(fields))

    return rows
  } catch (err) {
    throw err
  }
}