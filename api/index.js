
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

// router.use(async (req,res,next) => {
//   const prefix = 'Bearer ';
//   const auth = req.header('Authorization');

//   if (!auth) {
//     next();
//   } else if (auth.startsWith(prefix)) {
//     const token = auth.slice(prefix.length);

//     try {
//       const parsedToken = jwt.verify(token, JWT_SECRET);

//       const id = parsedToken && parsedToken.id;

//       if(id) {
//         req.user = await getUserByID(id);
//         next();
//       }
//     } catch(err) {
//       next(err)
//     }
//   }else {
//     next({
//       name: 'AuthorizationHeaderError',
//       message: `Authorization token must start with ${ prefix }`
//     });
//   }
// });

// router.use((req, res, next) => {
//   if (req.user) {
//     console.log("User is set:", req.user);
//   }
//   next();
// });

// this makes all of the calls to the module /api/products.js to use the /api/products/ route
// for example, from cURLs, Postman, or 3rd party apps using our api

const productsRouter = require('./products');
const homeRouter = require('./home');

apiRouter.use('/products', productsRouter);
apiRouter.use('/', homeRouter);

const ordersRouter = require('./orders')
apiRouter.use('/orders', ordersRouter)

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const activeCartRouter = require('./activecart');
apiRouter.use('/cart', activeCartRouter);

module.exports = apiRouter;
