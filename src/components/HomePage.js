import React from 'react';
import { FeaturedProducts } from './';
export default function HomePage() {
  return (
    <div className="header">
      <img id="welcomeImg" src="https://i.imgur.com/AleLEV6.png" />
      <FeaturedProducts />
    </div>
  );
}
