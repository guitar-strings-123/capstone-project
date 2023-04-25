const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User, Orders } = require('../db/models');
const { JWT_SECRET = 'so safe and so secure' } = process.env;
const { requireUser } = require('./');

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({
      name: 'MissingCredentialsError',
      message: 'You need both a username and password to login',
    });
  }

  try {
    const user = await User.getUser({ username, password });
    if (!user) {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect',
      });
    } else {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1w' }
      );
      res.send({ user, message: 'logged in!', token });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const queriedUser = await User.getUserByUsername(username);
    if (queriedUser) {
      res.status(401);
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists',
      });
    } else if (password.length < 6) {
      res.status(401);
      next({
        name: 'PasswordLengthError',
        message: 'Password needs to be at least 6 characters!',
      });
    } else {
      const user = await User.createUser({
        username,
        password,
      });
      if (!user) {
        next({
          name: 'UserCreationError',
          message: 'There was a problem registering you. Please try again.',
        });
      } else {
        const token = jwt.sign(
          { id: user.id, username: user.username },
          JWT_SECRET,
          { expiresIn: '1w' }
        );
        res.send({ user, message: "you're signed up!", token });
      }
    }
  } catch (error) {
    next(error);
  }
});

router.get('/me', requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

router.get('/:username/orders', async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.getUserByUsername(username);
    if (!user) {
      next({
        name: 'NoUser',
        message: `Could not find user: ${username}`,
      });
    } else if (req.user && user.id === req.user.id) {
      const orders = await Orders.getAllOrdersByUserID(user.id);
      res.send(orders);
    }
  } catch (error) {
    next(error);
  }
});

// if user.isAdmin == true, then they can use this function
router.get('/users/orders', requireUser, async (req, res, next) => {
  try {
    const orders = Orders.getAllOrders()
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
    const order = Orders.getAllOrdersByOrderID(orderID)
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

module.exports = router;