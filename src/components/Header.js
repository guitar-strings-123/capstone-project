import React from 'react';
import CartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { default as NavBar } from './NavBar';
import '../style/Header.css';

export default function Header({ token, isAdmin }) {
    const logout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        window.location.reload();
    };

    return (
        <div id="header">
            <div id="center_header">
                <div id="left_wrapper">
                    <div id="company_logo">
                        <img id="logoImg" src="https://i.imgur.com/BaNuMXZ.png" />
                    </div>
                    <div className="dropdown">
                        <div className="link">Menu</div>
                        <div id="nav_bar">
                            <NavBar isAdmin={isAdmin} />
                        </div>
                    </div>
                </div>
                <div id="right_wrapper">
                    {token ? (
                        <div id="logoutBlock">
                            <button
                                id="logoutButton"
                                onClick={(event) => {
                                    event.preventDefault();
                                    logout();
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div id="loginRegisterBlock">
                            <div id="loginRegister">
                                <Link to="Login">Login</Link>
                                <div className="divider">|</div>
                                <Link to="Register">Register</Link>
                            </div>
                        </div>
                    )}
                    <div id="cartBlock">
                        <Link to="Cart">{<CartIcon sx={{ color: 'white' }} />}</Link>
                    </div>
                    {/* {!isAdmin ?  */}
                    <div id="admin">
                        <Link to="AdminHomePage" />
                    </div>
                    {/* : null} */}
                </div>
            </div>
        </div>
    );
}
