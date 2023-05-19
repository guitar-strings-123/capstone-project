import React, { useState, useEffect } from 'react';

export default function Cart({ DB, cart }) {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [cItems, setCItems] = useState(0);
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

  const deleteItemFromCart = async (activeCartId, quantity, itemId) => {
    const productId = itemId

    if (quantity > 1) {
      // remove 1 from the product bundle quantity
      quantity -= 1;

      try {
        const response = await fetch(`${DB}/api/cart/${activeCartId}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            quantity: quantity,
            productId: productId,
          }),
        });
        const result = await response.json();

        return result;
      } catch (error) {
        console.error(error)
      }

    } else {
      // delete the whole product bundle
      try {
        const response = await fetch(`${DB}/api/cart/remove/${itemId}`, {
          method: 'Delete',
          headers: {
            'Content-type': 'application/json',
          },
        });
        const result = await response.json();

        return result;
      } catch (err) {
        console.error(err);
      }
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

  const init2 = async () => {
    try {
      const result = await getCartItems();
      if (result) {
        setCartItems(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    init2();
  }, [cItems]);

  return (
    <div className="cart_page">
      {cartItems.length ? (
        <div>
          <div className="cartProducts">
            {cartItems.map((productBundle) => {
              const [item] = products.filter((object) => {
                return object.id == productBundle.product_id;
              });
              item ? (cartTotal += item.price * productBundle.quantity) : 0;
              return (
                <div className="productCard">
                  <div>{item?.name}</div>
                  <div>
                    <img className="imgSmall" src={item?.imgurl} />
                  </div>
                  <div>{item?.description}</div>
                  <div>Price: {item?.price}</div>
                  <div>Quantity: {productBundle.quantity}</div>
                  <button
                    onClick={async () => {
                      await deleteItemFromCart(productBundle.active_cart_id, productBundle.quantity, item.id);
                      setCItems(cItems + 1);
                    }}
                  >
                    Remove Item
                  </button>
                </div>
              );
            })}
          </div>
          <div className="total">Cart Total:${cartTotal}</div>
        </div>
      ) : (
        <div>{`Your cart is empty... :(`}</div>
      )}
    </div>
  );
}
