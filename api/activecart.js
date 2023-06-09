const express = require('express');
const cartRouter = express.Router();
const {} = require('../db');
const {
  getAllItemsInCart,
  getActiveCart,
  createActiveCart,
  addItemToCart,
  removeItemFromCart,
  updateQuantity,
  emptyCart,
} = require('../db/models/activecart');

// GET
cartRouter.get(`/:userId/items`, async (req, res, next) => {
  const userId = req.params.userId;
  
  try {
    const cartId = await getActiveCart(userId);
    const items = await getAllItemsInCart(cartId);
    return items;
  } catch (err) {
    console.log(err);
    next();
  }
});

cartRouter.get('/items/:cartId', async (req, res, next) => {
  const { cartId } = req.params;

  try {
    const cart = await getAllItemsInCart(cartId);

    res.send(cart);
  } catch (error) {
    console.error(error);
    next();
  }
});

cartRouter.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;

  try {
    const cart = await getActiveCart({userId});

    res.send({ cart });
  } catch (error) {
    console.error(error);
    next();
  }
});

//POST

cartRouter.post('/active/:userId', async (req, res, next) => {
  const { userId } = req.params;

  try {
    const newCart = await createActiveCart(userId);

    res.send(newCart)
  } catch (error) {
    console.error(error);
    next();
  }
});

cartRouter.post('/:userId', async (req, res, next) => {
  const { productId, cartId, quantity } = req.body;

  try {
    const item = await addItemToCart({ productId, cartId, quantity });
    console.log('api cartRouter item', item)
    res.send({ item });
  } catch (error) {
    console.error(error);
    next();
  }
});

//PUT

cartRouter.put('/:activeCartId', async (req, res, next) => {
  const { activeCartId } = req.params;
  const { quantity, productId } = req.body;
  
  try {
    const updatedQuantity = await updateQuantity({activeCartId, quantity, productId})
    res.send({updatedQuantity});
  } catch (error) {
    console.error(error);
    next();
  }
})

//DELETE

cartRouter.delete('/remove/:itemId', async (req, res, next) => {
  const { itemId } = req.params;

  try {
    const item = await removeItemFromCart(itemId);
    res.status(200).json({ message: 'item removed' });
  } catch (error) {
    console.error(error);
    next();
  }
});

cartRouter.delete('/:activeCartId', async (req, res, next) => {
  const { activeCartId } = req.params;

  try {
    const productBundles = await emptyCart(activeCartId)
  } catch (error) {
    console.error(error);
    next();
  }
})

module.exports = cartRouter;