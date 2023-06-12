import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';

export default function Products({DB}) {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');

  const filteredProducts = products.filter((product) => {
    const { name, description } = product;
    if (name.toLowerCase().includes(query.toLowerCase())) {
      return name.toLowerCase().includes(query.toLowerCase());
    } else if (description.toLowerCase().includes(query.toLowerCase())) {
      return description.toLowerCase().includes(query.toLowerCase());
    }
  });
  const getProducts = async () => {
    try {
      const response = await fetch(`${DB}/api/products/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();

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
                      {/* <br /> */}
                      <div className="productDescription">{product.description}</div>
                    </p>
                  </div>
                  <Link to={`/Products/${product.id}`}>
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
