import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, selectCart } from "./cartSlice";

const activeCart = () => {
  const dispatch = useDispatch();
  dispatch(fetchCart());
  const userCart = useSelector(selectCart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  function handleDelete(event) {
    console.log("delete" + event.target);
    //need to use clear cart for the delete functionality
  }
  const { id, fulfilled, createdAt, products } = userCart;
  return (
    <div id="userCartCard">
      <h1>Cart</h1>
      <span>Cart ID:{id}</span>
      <span>Submitted:{fulfilled}</span>
      <span>Cart since:{createdAt}</span>
      <div id="productsInCart">
        products:
        {products && products.length
          ? products.map((prod) => {
              return (
                <div key={`prod inCart:${prod.id}`}>
                  <Link to={`/products/${prod.id}`}>
                    <div id="prodCard">
                      <img id="tinyImg" src={prod.imageUrl} />
                      <small>{prod.name}</small>
                      <small>{prod.qty + "at" + prod.price}</small>
                    </div>
                  </Link>
                  <button id="cartDeleteItemBtn" onClick={handleDelete}>
                    x
                  </button>
                </div>
              );
            })
          : "empty"}
      </div>
    </div>
  );
};

export default activeCart;
