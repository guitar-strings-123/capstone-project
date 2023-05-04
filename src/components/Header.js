import React from 'react';
import CartIcon from '@material-ui/icons/ShoppingCart'
import { Link, useParams } from 'react-router-dom';

export default function Header() {
    const {isAdmin} = useParams()
import CartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useParams } from 'react-router-dom';
import { default as NavBar } from './NavBar';
import '../style/Header.css';

export default function Header({ token }) {
    const {isAdmin} = useParams()
    const logout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        window.location.reload()
    }

    return (
        <div id='header'>
            <div id='center_header'>
                <div id='left_wrapper'>
                    <div id='company_logo'>STRUM ON IN</div>
                    <div className="dropdown">
                        <button className='link'>Menu</button>
                        <div id='nav_bar'>
                            <NavBar />
                        </div>
                    </div>
                </div>
                <div id='right_wrapper'>
                    {
                        token ?
                            <div id="logoutBlock">
                                <button id="logoutButton" onClick={(event => {
                                    event.preventDefault();
                                    logout();
                                })}>Logout</button>
                            </div>
                            : (
                                <div id="loginRegisterBlock">
                                    <div id="loginRegister"><Link to="Login">Login</Link><div className="divider">|</div><Link to="Register">Register</Link></div>
                                </div>
                            )
                    }
                    <div id="cartBlock">
                        <Link to="Cart">{<CartIcon sx={{ color: "white" }} />}</Link>
                    </div>
                    {isAdmin ? <div id='admin'>
                        <Link to={<AdminHomePage />} />
                    </div> : null}
                </div>
            </div>

        </div>
    )
}