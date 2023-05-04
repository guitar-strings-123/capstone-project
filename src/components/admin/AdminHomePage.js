import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function AdminHomePage() {
    const { isAdmin } = useParams()


    return (
        <>
            {
                !isAdmin ?
                    <div>
                        <Link to='/AdminProducts'>
                            <button>All Products</button>
                        </Link>
                        <Link to='/AdminUsers'>
                            <button>All Users</button>
                        </Link>
                    </div> :
                    'You are not authorized to be on this page'
            }
        </>
    )
}