import React, { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import '../style/App.css';

// import components
import { default as Header } from './Header';
import { default as HomePage } from './HomePage';
import { default as Cart } from './Cart';
import { default as Header } from './Header';
import { default as Register} from './Register'
import {
  AdminProducts,
  AddProduct,
} from './admin/index.js'

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }

  // const logoutButton = document.getElementById('logoutButton');
  // logoutButton.onclick(
  //   logout
  // )

  // render all components below
  return (
    <div className="app-container">
      <Header />
      {/* will eventually need to add ternary here to check for token */}
      {<button onClick={(event=>{
        event.preventDefault();
        logout();
      })}>Logout</button>
      }
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/AdminProducts' element={<AdminProducts />} />
        <Route path='/AddProduct' element={<AddProduct />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/register' element = {<Register token={token} setToken={setToken}/>} />
      </Routes>
      <div className="header">
        <h1>Hello, World!</h1>
      </div>
      <div className="title">
        <p>API Status: {APIHealth}</p>
      </div>
      <div className="feature">feature component here</div>
      <div className="products">
        <div className="productCard">Product Card here</div>
        <div className="productCard">Product Card here</div>
        <div className="productCard">Product Card here</div>
        <div className="productCard">Product Card here</div>
        <div className="productCard">Product Card here</div>
        <div className="productCard">Product Card here</div>
        <div className="productCard">Product Card here</div>
        <div className="productCard">Product Card here</div>
      </div>
      <div className="footer">footer</div>
    </div>
  );
};

export default App;
