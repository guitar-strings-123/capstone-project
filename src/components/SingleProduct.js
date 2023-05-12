import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';

export default function SingleProduct({ DB, cart, token }) {
  const [product, setProduct] = useState('');
  const navigate = useNavigate();
  const { productId } = useParams();
  const userID = localStorage.getItem('userID');

  const getCart = async () => {
    try {
      const response = await fetch(`${DB}/api/cart/${userID}`, {
        headers: {
          'Content-type': 'application/json'
        }
      });
      const {cart} = await response.json();

      if (cart && cart.length) {
        // if user has a cart in the array, return true
        localStorage.setItem('cartId', cart[0].user_id);
        return true;
      } else {
        // if no cart, return false
        return false;
      }
    } catch (err) {
      console.error(err);
    }


  }

  const addActiveCart = async () => {
    try {
      const response = await fetch(`${DB}/api/cart/active/${userID}`, {
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

  const addItemToCart = async (productId) => {
    try {
      const response = await fetch(`${DB}/api/cart/${userID}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId,
          cartId: userID,
          quantity: 1,
        }),
      });
      const result = await response.json();
      console.log('product bundle added:', result);
   
      return;
    } catch (err) {
      console.error(err);
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
              onClick={cart.length ? addItemToCart : handleClick}
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
