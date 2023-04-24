const express = require("express");
const cartRouter = express.Router();
const {} = require("../db");
const {
  getAllItemsInCart,
  getActiveCart,
  createActiveCart,
  addItemToCart,
  removeItemFromCart,
} = require("../db/models/activecart");

// GET
router.get(`/:userId/items`, async (req, res, next) => {
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

router.get("/:cartId", async (req, res, next) => {
  const cartId = req.params;
  try {
    const cart = await getAllItemsInCart(cartId);
    res.status(200).json({ message: cart });
  } catch (error) {
    console.error(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const cart = await getActiveCart(userId);
    res.status(200).json({ message: cart });
  } catch (error) {
    console.error(error);
  }
});

//POST

router.post("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const newCart = await createActiveCart(userId);
    res.status(201).json({ message: newCart });
  } catch (error) {
    console.error(error);
  }
});

router.post("/:cartId", async (req, res, next) => {
  const { cartId } = req.params;
  const { productId, quantity } = req.body;
  try {
    const item = await addItemToCart(productId, cartId, quantity);
    res.status(201).json({ message: item });
  } catch (error) {
    console.error(error);
  }
});

//DELETE

router.delete("/:itemId", async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const item = await removeItemFromCart(itemId);
    res.status(200).json({ message: "item removed" });
  } catch (error) {
    console.error(error);
  }
});

//More Cart Goals ----
//Find a way to get all products based on active cart itmes
//Update the quanity (Router.patch or.put)
//seed the database

module.exports = cartRouter;
