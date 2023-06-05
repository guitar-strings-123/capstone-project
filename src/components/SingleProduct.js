import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';

export default function SingleProduct({ DB, user }) {
  const [product, setProduct] = useState('');
  const navigate = useNavigate();
  const { productId } = useParams();

  const getCart = async () => {
    try {
      const response = await fetch(`${DB}/api/cart/${user.id}`, {
        headers: {
          'Content-type': 'application/json'
        }
      });
      const { cart } = await response.json();

      if (cart && cart.length) {
        // if user has a cart in the array, return true
        return true;
      } else {
        // if no cart, return false
        return false;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function getCartItems() {
    // since there's only 1 cart per user, use user.id to get the cart

    try {
      const response = await fetch(`${DB}/api/cart/items/${user.id}`, {
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

  const addActiveCart = async () => {
    try {
      const response = await fetch(`${DB}/api/cart/active/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const result = await response.json();

      return result;
    } catch (err) {
      console.error(err);
    }
  };

  const addItemToCart = async () => {
    const cartItems = await getCartItems();
    const [productBundle] = cartItems.filter((bundle) => {
      return (bundle.product_id == productId)
    })

    if (productBundle && productBundle.quantity > 0) {
      // just update the quantity in the bundle by 1
      const quantity = productBundle.quantity + 1;

      try {
        const response = await fetch(`${DB}/api/cart/${user.id}`, {
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
      // add a new product bundle with quantity 1
      try {
        const response = await fetch(`${DB}/api/cart/${user.id}`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            productId: productId,
            cartId: user.id,
            quantity: 1,
          }),
        });
        const result = await response.json();

        return;
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleClick = async () => {
    const hasCart = await getCart();
    // if the user does not have a cart...
    if (!hasCart) {
      // add a cart
      await addActiveCart();
    }
    // add item to cart
    await addItemToCart(productId);
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`${DB}/api/products/${productId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        setProduct(result);
      } catch (err) {
        console.error(err);
      }
    };
    getProduct();
  }, []);

  return (
    <>
      <div className="single-product-page">
        {product ? (
          <div className="single-product-card">
            <p style={{ marginBottom: 0, padding: 0 }}>
              {product.name} : ${product.price}
              <br />
              {product.description}
              <br />
              <img src={product.imgurl} width="150" />
            </p>
            <button
              onClick={handleClick}
              className="add-to-cart"
            >
              Add To Cart
            </button>
          </div>
        ) : (
          <p>Error loading products</p>
        )}
        <button className="back-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </>
  );
}
