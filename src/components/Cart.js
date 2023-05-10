import React, { useState, useEffect } from 'react';
// import { Routes, Route, useParams } from 'react-router-dom';

export default function Cart({ DB, cart }) {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  let cartId = localStorage.getItem('cartId');
  let cartTotal = 0;

  async function getAllProducts() {
    try {
      const response = await fetch(`${DB}/api/products/`, {
        headers: {
          'Content-type': 'application/json',
        },
      });
      const result = await response.json();

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async function getCartItems() {
    try {
      const response = await fetch(`${DB}/api/cart/items/${cartId}`, {
        headers: {
          'Content-type': 'application/json',
        },
      });
      const result = await response.json();

      return result;
    } catch (err) {
      console.log(err);
    }
  }
  const deleteItemFromCart = async (itemId) => {
    try {
      const response = await fetch(`${DB}/api/cart/remove/${itemId}`, {
        method: 'Delete',
        headers: {
          'Content-type': 'application/json',
        },
      });
      let result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  const init = async () => {
    try {
      const result = await getCartItems();
      if (result) {
        setCartItems(result);
      }

      const productsResult = await getAllProducts();
      if (productsResult) {
        setProducts(productsResult);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    init();
  }, [cartItems]);

  return (
    <div className="cart_page">
      {cartItems.map((productBundle) => {
        const [item] = products.filter((object) => {
          return object.id == productBundle.product_id;
        });
        item ? (cartTotal += item.price) : 0;

        return (
          <div>
            <div>{item?.name}</div>
            <div>
              <img className="imgSmall" src={item?.imgurl} />
            </div>
            <div>{item?.description}</div>
            <div>{item?.price}</div>
            <div>{productBundle.quantity}</div>
            <button
              onClick={() => {
                deleteItemFromCart(item.id);
              }}
            >
              Remove Item
            </button>
          </div>
        );
      })}
      <div>Total:${cartTotal}</div>
    </div>
  );
}
