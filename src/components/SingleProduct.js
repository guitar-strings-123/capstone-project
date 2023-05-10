import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';

export default function SingleProduct({ DB, cart, token }) {
  const [product, setProduct] = useState('');
  const navigate = useNavigate();
  const { productId } = useParams();
  const userID = localStorage.getItem('userID');

  const addItemToCart = async (productId) => {
    console.log(productId, userID);
    try {
      const response = await fetch(`${DB}/api/cart/${userID}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          //   Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: productId,
          cartId: userID,
          quantity: 1,
        }),
      });
      let result = await response.json();
      console.log(result);
      return;
    } catch (err) {
      console.error(err);
    }
  };

  const addActiveCart = async () => {
    try {
      const response = await fetch(`${DB}/api/cart/active/${userID}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      let result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = async () => {
    addActiveCart;
    addItemToCart(productId);
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`${DB}/api/products/${productId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        let result = await response.json();
        console.log(result);
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
