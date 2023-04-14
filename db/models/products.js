// queried from table 'products'
const client = require("../client");

module.exports = {
    // add your database adapter fns here
    createProducts,
    getAllProducts,
  };

  /*
    pass in an object, so later you can pass in an array of objects and .map() through them
    to easily create multiple products with one function call
  */
  async function createProducts({ name, description, price }) {
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