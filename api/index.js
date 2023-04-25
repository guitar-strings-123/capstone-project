
const apiRouter = require('express').Router();

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// this makes all of the calls to the module /api/products.js to use the /api/products/ route
// for example, from cURLs, Postman, or 3rd party apps using our api

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const ordersRouter = require('./orders')
apiRouter.use('/orders', ordersRouter)

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const activeCartRouter = require('./activecart');
apiRouter.use('/cart', activeCartRouter);

module.exports = apiRouter;
