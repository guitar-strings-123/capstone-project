import { useState, useEffect } from 'react';
import React from 'react';
// import { getAllProducts } from '../../db/models/products';

export default function ProductCard() {
  const [products, setProducts] = useState([]);

  const init = async () => {
    try {
      const result = await getAllProducts();
      if (result) {
        setProducts(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <div>{products}</div>;
}
