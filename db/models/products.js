// queried from table 'products'
const client = require("../client");
const {
    User
} = require('./models')

module.exports = {
    // add your database adapter fns here
    createProduct,
    getAllProducts,
    addProduct,
  };

  /*
    pass in an object, so later you can pass in an array of objects and .map() through them
    to easily create multiple products with one function call
  */
  async function createProduct({ name, description, price, categoryID }) {
    try {
        const { rows: [product] } = await client.query(
          `
            INSERT INTO products(name, description, price, categoryID) 
            VALUES($1, $2, $3, $4) 
            ON CONFLICT (name) DO NOTHING 
            RETURNING *;
          `,
          [name, description, price, categoryID]
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

// function for administrator to add product to database
async function addProduct({name, description, price, categoryID}) {
    const users = await User.getallUsers();
    // under construction: have to add curUser variable that stores user info upon login
    const user = users.filter(entry => entry.username == curUser.username)

    if (user.isAdmin) {
        try {
            const result = await createProduct({name, description, price, categoryID});
        
            return result;
        } catch (error) {
            throw error;
        }
    } else {
        // return an error object to use in the front end to display the error message
        return {
            name: `InvalidAuthorizationError`,
            message: 'This account lacks administrative privilege'
        };
    }
};
