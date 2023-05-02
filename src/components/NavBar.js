import React from 'react';
import { Link } from 'react-router-dom';
import '../style/NavBar.css';

export default function NavBar() {

    return (
        <div id='nav_bar_inner'>
            <div id='home'>
                <Link style={{ textDecoration: 'none', color: 'black'}} to="HomePage">Home</Link>
            </div>
            <div id='cart'>
                <Link style={{ textDecoration: 'none', color: 'black'}} to="Cart">Cart</Link>
            </div>
        </div>
    )
}