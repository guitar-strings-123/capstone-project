import React from 'react';
import { default as FeaturedProducts } from './FeaturedProducts';
import '../style/HomePage.css'

export default function HomePage() {

  return (
    <div id="homeContainer">
      <div className="heroContainer">
        <div className="hero">
          <h1>STRUM ON IN</h1>
          <h3>Let us be your next adventure</h3>
        </div>
      </div>
      <div className="feature">
        <FeaturedProducts />
      </div>
    </div>
  );
}
