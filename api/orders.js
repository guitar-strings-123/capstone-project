const express = require('express');
const { createOrder } = require('../db/models/orders');
const { requireUser } = require('./utils');
const { getAllOrdersByOrderID, getAllOrders } = require('../db/models/orders')
const router = express.Router();



// if user.isAdmin == true, then they can use this function
router.get('/', requireUser, async (req, res, next) => {
    try {
        const orders = getAllOrders()
        if (!orders) {
            next({
                name: "NoOrders",
                message: "You haven't sold anything yet!"
            })
        } else (
            res.send(orders)
        )
    } catch (err) {
        next(err)
    }
})

// getting orders by orderid instead of user id
router.get('/:orderID/orders', requireUser, async (req, res, next) => {
    try {
        const { orderID } = req.params
        const order = getAllOrdersByOrderID(orderID)
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

router.post('/', requireUser, async (req, res, next) => {
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

router.use(async (req,res,next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);

      try {
        const parsedToken = jwt.verify(token, JWT_SECRET);

        const id = parsedToken && parsedToken.id;

        if(id) {
          req.user = await getUserByID(id);
          next();
        }
      } catch(err) {
        next(err)
      }
    }else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
      });
    }
  });

  router.use((req, res, next) => {
    if (req.user) {
      console.log("User is set:", req.user);
    }
    next();
  });

module.exports = router