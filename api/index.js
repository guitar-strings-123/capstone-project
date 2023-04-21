
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

// place your routers here


// this makes all of the calls to the module /api/products.js to use the /api/products/ route
// for example, from cURLs, Postman, or 3rd party apps using our api
const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

module.exports = apiRouter;
