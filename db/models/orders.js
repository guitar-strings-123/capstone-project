const client = require("../client");

const getAllOrders = async () => {
    try {
        const {rows} = await client.query(`
            SELECT *
            FROM orders;
        `)

        return rows
    } catch (err) {
        console.log(err) 
        throw err
    }
}

const createOrder = async (
    orderUserID,
    orderShipAddress,
    orderShipAddress2,
    orderCity,
    orderState,
    orderZip,
    orderEmail,
    orderShipped,
    orderTrackingNumber
) => {
    try {
        const { rows: [order] } = await client.query(`
            INSERT INTO orders("orderUserID", orderShipName, orderShipAddress, orderShipAddress2, orderCity, orderState, orderZip, orderEmail, orderShipped, orderTrackingNumber)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `, [orderUserID,
            orderShipAddress,
            orderShipAddress2,
            orderCity,
            orderState,
            orderZip,
            orderEmail,
            orderShipped,
            orderTrackingNumber])

        return order
    } catch (err) {
        console.log(err)
        throw err
    }
}





module.exports = {
    getAllOrders,
    createOrder
}