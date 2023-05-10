import React from "react";
import { Link } from "react-router-dom";

export default function AdminHomePage({ isAdmin }) {


    return (
        <>
            {
                isAdmin ?
                    <div id='test'>
                        <Link to='/AdminProducts'>
                            <button>All Products</button>
                        </Link>
                        <Link to='/AdminUsers'>
                            <button>All Users</button>
                        </Link>
                        <Link to='/AdminOrders'>
                            <button>All Orders</button>
                        </Link>
                    </div> :
                    <p>You are not authorized to be on this page</p>
            }
        </>
    )
}