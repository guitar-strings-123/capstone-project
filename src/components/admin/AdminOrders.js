import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/Admin.css'

export default function AdminOrders({ user, DB }) {
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function getOrders() {
            try {
                const response = await fetch(`${DB}/api/orders`, {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                const result = await response.json()
                setOrders(result)
            } catch (err) {
                console.log(err)
            }
        }
        getOrders()
    }, [])

    return (
        <>
            {user.isadmin ?
                <div className="container">
                    <div>
                        <button className='back-button' onClick={() => navigate(-1)}>Go Back</button>
                    </div>
                    <div className="products-container">
                        {orders.map((order) => {
                            return (
                                <div className="detailsCard" key={order.id}>
                                        <div>Name: {order.ordershipname}</div>
                                        <div>Street: {order.ordershipaddress}</div>
                                        {order.ordershipaddress2 ? <div>Address: {order.ordershipaddress2}</div> : null}
                                        <div>City: {order.ordercity}</div>
                                        <div>State: {order.orderstate}</div>
                                        <div>Zip/Postal: {order.orderzip}</div>
                                        <div>Email: {order.orderemail}</div>
                                        {order.ordershipped ? <div>Shipped: Yes</div> : <div>Shipped: No</div>}
                                        <div>Tracking No.: {order.ordertrackingnumber}</div>
                                        <br />
                                </div>
                            )
                        })}
                    </div>
                </div>
                : <p className="noAuthorization">You are not authorized to be on this page</p>
            }
        </>
    )
}