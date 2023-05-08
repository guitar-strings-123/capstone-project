import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');

  const filteredProducts = products.filter((product) => {
    const { name, description, imgURL, price } = product;
    if (name.toLowerCase().includes(query.toLowerCase())) {
      return name.toLowerCase().includes(query.toLowerCase());
    } else if (description.toLowerCase().includes(query.toLowerCase())) {
      return description.toLowerCase().includes(query.toLowerCase());
    }
  });
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
    <>
      <div id="search">
        Search products:&nbsp;
        <input
          className="productsInput"
          placeholder="Type here"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="search"
        />
      </div>
      <div className="title">
        <div className="products-container">
          {products.length ? (
            filteredProducts.map((product) => {
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
                    {product.imgurl ? <img className="imgSmall" src={product.imgurl} /> : <img className="imgSmall" src="https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg" />}
                  </Link>
                </div>
              );
            })
          ) : (
            <p>Error loading products</p>
          )}
        </div>
      </div>
    </>
  );
}
