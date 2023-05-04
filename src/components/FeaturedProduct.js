import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  // const chunk = (arr, size) =>
  //   Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
  //     arr.slice(i * size, i * size + size)
  //   );
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
      const response = await fetch('http://localhost:4000/api/products/', {
        headers: {
          'Content-Type': 'application/json',
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
              <Link to={`/${product.id}`}>
                <img className="imgSmall" src={product.imgurl} />
              </Link>
              {/* <img
                src={`/assets/${product.name
                  .split(' ')
                  .join('')
                  .toLowerCase()}-${product.id}`}
              /> */}
            </div>
          );
        })
      ) : (
        <p>Error loading products</p>
      )}
    </div>
  );
}
