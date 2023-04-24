const express = require("express");
const cartRouter = express.Router();
const {
  getAllItemsInCart,
  createNewCart,
  checkout,
  userCheckOut,
  getAllPreviousUserCarts,
} = require("../db");

// GET
router.get("/user/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const previousOrders = await getAllPreviousUserCarts(userId);
    res.send(previousOrders);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:cartId", async (req, res, next) => {
  const { cartId } = req.params;

  try {
    const cart = await getAllItemsInCart(cartId);
    res.send(cart);
  } catch (error) {
    console.error(error);
  }
});

// POST

router.post("/", async (req, res, next) => {
  try {
    const sessId = req.body;
    //console.log('session id', sessId.session);
    const newCart = await createNewCart(sessId.session);
    //console.log(newCart);
    res.send(newCart);
  } catch (error) {
    console.error(error);
  }
});

router.patch("/:cartId", async (req, res, next) => {
  try {
    const cartId = req.params.cartId;
    const { quantity, total } = req.body;

    console.log(quantity, parseInt(total), parseInt(cartId));
    const finishedCart = await checkout(
      parseInt(quantity),
      total,
      parseInt(cartId)
    );
    console.log(finishedCart);
    res.send(finishedCart);
  } catch (error) {
    console.error(error);
  }
});

router.post("/:cartId", async (req, res, next) => {
  try {
    const cartId = req.params.cartId;
    const { userId } = req.body;

    const checkedOutCart = await userCheckOut(
      parseInt(cartId),
      parseInt(userId)
    );
    console.log("this be checked out", checkedOutCart);
    res.send(checkedOutCart);
  } catch (error) {
    console.error(error);
  }
});

module.exports = cartRouter;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCart, selectCart } from "./cartSlice";

// const activeCart = () => {
//   const dispatch = useDispatch();
//   dispatch(fetchCart());
//   const userCart = useSelector(selectCart);

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   function handleDelete(event) {
//     console.log("delete" + event.target);
//     //need to use clear cart for the delete functionality
//   }
//   const { id, fulfilled, createdAt, products } = userCart;
//   return (
//     <div id="userCartCard">
//       <h1>Cart</h1>
//       <span>Cart ID:{id}</span>
//       <span>Submitted:{fulfilled}</span>
//       <span>Cart since:{createdAt}</span>
//       <div id="productsInCart">
//         products:
//         {products && products.length
//           ? products.map((prod) => {
//               return (
//                 <div key={`prod inCart:${prod.id}`}>
//                   <Link to={`/products/${prod.id}`}>
//                     <div id="prodCard">
//                       <img id="tinyImg" src={prod.imageUrl} />
//                       <small>{prod.name}</small>
//                       <small>{prod.qty + "at" + prod.price}</small>
//                     </div>
//                   </Link>
//                   <button id="cartDeleteItemBtn" onClick={handleDelete}>
//                     x
//                   </button>
//                 </div>
//               );
//             })
//           : "empty"}
//       </div>
//     </div>
//   );
// };

// export default activeCart;
