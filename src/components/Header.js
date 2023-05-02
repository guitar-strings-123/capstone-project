import React from 'react';
import CartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { default as NavBar } from './NavBar';
import '../style/Header.css';

export default function Header() {

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
                    <Link to="Cart">{<CartIcon sx={{ color: "white" }} />}</Link>
                </div>
            </div>
        </div>
    )
}
