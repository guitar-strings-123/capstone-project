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
import { default as Profile } from './Profile';
import {
  AdminProducts,
  AddProduct,
  AdminHomePage,
  AdminUsers,
  AdminOrders
} from './admin/index.js';
import SingleProduct from './SingleProduct';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [token, setToken] = useState('');
  const [cart, setCart] = useState({});
  const [user, setUser] = useState({});

  let DB = `https://strumonin.onrender.com`;
  // let DB = `http://localhost:4000`;

  const fetchUser = async (storedToken) => {
    let userName;

    try {
      const userResponse = await fetch(`${DB}/api/users/holder/${storedToken}`, {
        headers: {
          'Content-type': 'application/json',
        },
      });
      const userResult = await userResponse.json();
      if (userResult) {
        userName = userResult.username;
      }
    } catch (error) {
      console.error(error)
    }

    try {
      const userObj = await fetch(`${DB}/api/users/fetch/${userName}`, {
        headers: {
          'Content-type': 'application/json',
        },
      });
      const returnedUser = await userObj.json();

      return returnedUser;
    } catch (error) {
      console.error(error);
    }
  };

    // reload token on page refresh
    useEffect(() => {
      let storedToken = localStorage.getItem('token');
      setToken(storedToken);
  
      const initUser = async () => {
        const fetchedUser = await fetchUser(storedToken);
        setUser(fetchedUser);
      }
      initUser();
    }, []);

  useEffect(() => {
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      healthy ? console.log('api is up! :D') : console.log('api is down :/');
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    getAPIStatus();
  }, []);

  const isAdmin = localStorage.getItem('isAdmin');

  // render all components below
  return (
    <div className="app-container">
      <Header token={token} isAdmin={isAdmin} DB={DB} />
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
        <Route
          path="/AdminUsers"
          element={<AdminUsers isAdmin={isAdmin} DB={DB} />}
        />
        <Route 
          path="/AdminOrders" 
          element={<AdminOrders isAdmin={isAdmin} DB={DB} />} 
        />
        <Route
          path="/AddProduct"
          element={<AddProduct isAdmin={isAdmin} DB={DB} />}
        />
        <Route
          path="/cart"
          element={<Cart DB={DB} user={user} />}
        />
        <Route path="/products" element={<Products DB={DB} />} />
        <Route
          path="/products/:productId"
          element={<SingleProduct DB={DB} cart={cart} user={user} />}
        />
        <Route path="/profile" element={<Profile DB={DB} />} />
        <Route
          path="/login"
          element={
            <Login
              token={token}
              setToken={setToken}
              setCart={setCart}
              DB={DB}
            />
          }
        />
        <Route
          path="/register"
          element={<Register token={token} setToken={setToken} DB={DB} />}
        />
        <Route path='/UnderConstruction' element={<UnderConstruction />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
