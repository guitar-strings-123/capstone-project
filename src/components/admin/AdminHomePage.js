import React from "react";
import { Link } from "react-router-dom";
import '../../style/Admin.css'

export default function AdminHomePage({ user }) {


    return (
        <>
            {
                user.isadmin ?
                    <div id='contentContainer'>
                        <div id='contentCard'>
                            <Link to='/AdminProducts'>
                                <button>All Products</button>
                            </Link>
                            <Link to='/AdminUsers'>
                                <button>All Users</button>
                            </Link>
                            <Link to='/AdminOrders'>
                                <button>All Orders</button>
                            </Link>
                        </div>
                    </div> :
                    <p>You are not authorized to be on this page</p>
            }
        </>
    )
}