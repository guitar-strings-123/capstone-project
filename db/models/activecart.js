const client = require("../client");

const createActiveCart = async ({userId}) => {
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

const getActiveCart = async (userId) => {
  try {
    const { rows } = await client.query(`
            SELECT * 
            FROM active_cart
            WHERE user_id=${userId}
        `);
    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const addItemToCart = async ({productId, cartId, quantity}) => {
  try {
    const { rows } = await client.query(
      `
            INSERT INTO active_cart_items(product_id, active_cart_id, quantity)
            VALUES($1, $2, $3)
            RETURNING *;
        `,
      [productId, cartId, quantity]
    );

    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateQuanity = async (activeCartItemId, quantity) => {
  try {
    const { rows } = await client.query(
      `
            UPDATE active_cart_items
            SET quantity=${quantity}
            WHERE id=${activeCartItemId}
            `
    );
    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const removeItemFromCart = async (activeCartItemId) => {
  try {
    const { rows } = await client.query(
      `
                DELETE FROM active_cart_items
                WHERE id=${activeCartItemId}
            `
    );
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
  updateQuanity,
};
