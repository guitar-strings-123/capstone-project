import React from 'react';
import CartIcon from '@material-ui/icons/ShoppingCart'
import { Link, useParams } from 'react-router-dom';

export default function Header() {
    const {isAdmin} = useParams()

    return (
        <div id='header'>
            {/* CSS should center the center_header div within the parent header div and make it fill ~60% of the header div only */}
            <div id='center_header'>
                {/* company logo should be on the far left of center_header */}
                <div id='company_logo'>Strum On In</div>
                {/* nav_bar component, when written, should be to the right of the company logo but still on the left within the center_header with it*/}
                <div id='nav_bar'>
                    {/* add drop down nav_bar component here after it is built */}
                </div>
                {/* cart div should be on the far right of the center_header */}
                <div id='cart'>
                    <Link to={<Cart />} >{<CartIcon />}</Link>
                    {isAdmin ? <div id='admin'>
                        <Link to={<AdminHomePage />} />
                    </div> : null}
                </div>
            </div>
        </div>
    )
}
