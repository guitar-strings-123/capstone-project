import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';

export default function FeaturedProducts({ DB }) {
  const [products, setProducts] = useState([]);
  let featuredProducts = [
    products[0],
    products[1],
    products[2],
    products[3],
    products[4],
    products[5],
    products[6],
    products[7],
  ];
  const getProducts = async () => {
    try {
      const response = await fetch(`${DB}/api/products/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let result = await response.json();

      return result;
    } catch (err) {
      console.error(err);
    }
  };

  const init = async () => {
    try {
      const result = await getProducts();
      if (result) {
        setProducts(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="products">
      {products.length ? (
        featuredProducts.map((product) => {
          return (
            <div className="productCard" key={product.id}>
              <div className="cardTitle">
                <p style={{ marginBottom: 0, padding: 0 }}>
                  {product.name} : {product.price}
                  <br />
                  {product.description}
                </p>
              </div>
              <Link to={`/Products/${product.id}`}>
                <img className="imgSmall" src={product.imgurl} />
              </Link>
            </div>
          );
        })
      ) : (
        <p>Error loading products</p>
      )}
    </div>
  );
}
