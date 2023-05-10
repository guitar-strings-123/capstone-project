import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Login.css';

export default function Login({ token, setToken, DB, setCart }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (token) {
        navigate('/');
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [token]);

  const loginUser = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch(`${DB}/api/users/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      });

      const result = await response.json();
      setToken(result.token);
      localStorage.setItem('token', result.token);
      localStorage.setItem('username', result.user.username);
      if (result.user.isadmin == true) {
        localStorage.setItem('isAdmin', result.user.isadmin);
      }

      const cartResponse = await fetch(`${DB}/api/cart/${result.user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const {cart: [cartResult]} = await cartResponse.json();
      localStorage.setItem('cartId', cartResult.id);
      
      setCart(cartResult);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="loginContent">
      <div className="loginCard">
        <form onSubmit={(event) => loginUser(event)}>
          {token ? (
            <div id="redirectContainer">
              <div>Logged in.</div>
              <div>Redirecting...</div>
            </div>
          ) : (
            <>
              <div id="username">
                <label id="usernameLabel">Username</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                ></input>
              </div>
              <div id="password">
                <label id="passwordLabel">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                ></input>
              </div>
              <button type="submit">Login</button>
              <div id="registerContainer">
                No account? <Link to="../Register">Register here</Link>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}