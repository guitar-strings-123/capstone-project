import React from 'react';
import CartIcon from '@material-ui/icons/ShoppingCart'
import { Link } from 'react-router-dom';

export default function Header() {

    return (
        <div id='header'>
            <div id='center_header'>
                {/* CSS should center the center_header div within the parent header div and make it fill ~60% of the header div only */}
                <div id='company_logo'>Strum On In</div>
                <div id='nav_bar'>
                    {/* add drop down nav_bar component here after it is built */}
                </div>
                <div id='cart'>
                    {/* add link code here to bring you to the cart component after the cart component has been merged  */}
                    <Link to={<Cart />} >{<CartIcon />}</Link>
                </div>
            </div>
        </div>
    )
}