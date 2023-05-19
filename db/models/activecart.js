const client = require('../client');

const createActiveCart = async (userId ) => {
  try {
    const {
      rows: [activeCart],
    } = await client.query(
      `
      INSERT INTO active_cart("user_id")
      VALUES ($1)
      RETURNING *;
    `,
      [userId]
    );

    return activeCart;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getActiveCart = async ({userId}) => {
  try {
    const { rows } = await client.query(`
      SELECT * 
      FROM active_cart
      WHERE user_id=$1;
    `,[userId]);

    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const addItemToCart = async ({ productId, cartId, quantity }) => {
  try {
    const { rows } = await client.query(
      `
        INSERT INTO active_cart_items(active_cart_id, product_id, quantity)
        VALUES($1, $2, $3)
        RETURNING *;
      `,
      [cartId, productId, quantity]
    );
    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateQuantity = async ({activeCartId, quantity, productId}) => {
  try {
    const { rows } = await client.query(`
        UPDATE active_cart_items
        SET quantity=${quantity}
        WHERE active_cart_id=${activeCartId} AND product_id=${productId}
        RETURNING *;
      `);

    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const removeItemFromCart = async (activeCartItemId) => {
  try {
    const { rows } = await client.query(`
      DELETE FROM active_cart_items
        WHERE product_id=${activeCartItemId}
    `);
    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getAllItemsInCart = async (cartId) => {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM active_cart_items
      WHERE active_cart_id=${cartId}
    `);
    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  createActiveCart,
  getActiveCart,
  addItemToCart,
  removeItemFromCart,
  getAllItemsInCart,
  updateQuantity,
};
