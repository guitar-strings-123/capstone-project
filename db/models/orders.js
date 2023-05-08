const client = require('../client');
module.exports = {};

const getAllOrders = async () => {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM orders;
    `);

    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

async function createOrder({
  orderUserID,
  orderShipName,
  orderShipAddress,
  orderShipAddress2,
  orderCity,
  orderState,
  orderZip,
  orderEmail,
  orderShipped,
  orderTrackingNumber
}) {
  try {
    const {
      rows: [order],
    } = await client.query(`
      INSERT INTO orders("orderUserID", orderShipName, orderShipAddress, orderShipAddress2, orderCity, orderState, orderZip, orderEmail, orderShipped, orderTrackingNumber)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `,
      [
        orderUserID,
        orderShipName,
        orderShipAddress,
        orderShipAddress2,
        orderCity,
        orderState,
        orderZip,
        orderEmail,
        orderShipped,
        orderTrackingNumber,
      ]
    );

    return order;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

async function getAllOrdersByUserID(userID) {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM orders
      WHERE "orderUserID" = $1;
    `, [userID]);
    if (!rows || !rows.length) return null;
    const [order] = rows;
    return order;
  } catch (error) {
    console.error(error);
  }
}

async function getAllOrdersByOrderID(orderID) {
  try {
    const { rows } = await client.query(`
      SELECT * 
      FROM orders
      WHERE id = $1
    `, [orderID])
    if (!rows || !rows.length) return null
    const [order] = rows
    return order
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  getAllOrders,
  createOrder,
  getAllOrdersByUserID,
  getAllOrdersByOrderID
};
