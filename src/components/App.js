import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import '../style/App.css';

// import components
import { default as Header } from './Header';
import { default as HomePage } from './HomePage';
import { default as Cart } from './Cart';
import { default as Register } from './Register';
import { default as Products } from './Products';
import { default as Login } from './Login';
import { default as Footer } from './Footer';
import { default as UnderConstruction } from './UnderConstruction';
import {
  AdminProducts,
  AddProduct,
  AdminHomePage,
  AdminUsers,
} from './admin/index.js';
import SingleProduct from './SingleProduct';

DB = DATABASE_URL

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [token, setToken] = useState('');

  // reload token on page refresh
  useEffect(() => {
    let storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

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

  const isAdmin = localStorage.getItem('isAdmin');

  // render all components below
  return (
    <div className="app-container">
      <Header token={token} isAdmin={isAdmin} DB={DB}/>
      {/* will eventually need to add ternary here to check for token */}
      <Routes>
        <Route path="/" element={<HomePage DB={DB} />} />
        <Route
          path="/AdminHomePage"
          element={<AdminHomePage isAdmin={isAdmin} DB={DB} />}
        />
        <Route
          path="/AdminProducts"
          element={<AdminProducts isAdmin={isAdmin} DB={DB} />}
        />
        <Route path="/AdminUsers" element={<AdminUsers isAdmin={isAdmin} DB={DB} />} />
        <Route path="/AddProduct" element={<AddProduct isAdmin={isAdmin} DB={DB} />} />
        <Route path="/cart" element={<Cart DB={DB} />} />
        <Route path="/products" element={<Products  DB={DB}/>} />
        <Route path="/products/:productId" element={<SingleProduct DB={DB} />} />
        <Route
          path="/login"
          element={<Login token={token} setToken={setToken} DB={DB} />}
        />
        <Route
          path="/register"
          element={<Register token={token} setToken={setToken}  DB={DB}/>}
        />
        <Route path="/UnderConstruction" element={<UnderConstruction />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
