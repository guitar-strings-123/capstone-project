const express = require('express');
const { createOrder, getAllOrders, getAllOrdersByOrderID } = require('../db/models/orders');
const { requireUser } = require('./utils');
const router = express.Router();


// if user.isAdmin == true, then they can use this function
router.get('/', async (req, res, next) => {
    try {
        const orders = await getAllOrders()
        res.send(orders)
    } catch (err) {
        console.log(err, "error receiving orders")
        next()
    }
})

// getting orders by orderid instead of user id
router.get('/:orderID/orders', async (req, res, next) => {
    try {
        const { orderID } = req.params
        const order = await Orders.getAllOrdersByOrderID(orderID)
        if (!order) {
            next({
                name: 'Order',
                message: `Could not find order: ${orderID}`,
            });
        } else {
            res.send(order);
        }
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    const {
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
    } = req.body
    const productData = {}
    try {
        productData.orderUserID = orderUserID
        productData.orderShipName = orderShipName
        productData.orderShipAddress = orderShipAddress
        productData.orderShipAddress2 = orderShipAddress2
        productData.orderCity = orderCity
        productData.orderState = orderState
        productData.orderZip = orderZip
        productData.orderEmail = orderEmail
        productData.orderShipped = orderShipped
        productData.orderTrackingNumber = orderTrackingNumber

        const order = await createOrder(productData)
        if (order) {
            res.send(order)
        } else {
            next
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router