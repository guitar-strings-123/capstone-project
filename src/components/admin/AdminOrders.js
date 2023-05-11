import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminOrders({ isAdmin, DB }) {
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
            {isAdmin ?
                <div className="title">
                    <div className="products-container">
                        {orders.map((order) => {
                            return (
                                <div className="productCard" key={order.id}>
                                    <div>
                                        <div>Name: {order.ordershipname}</div>
                                        <div>Address: {order.ordershipaddress}</div>
                                        {order.ordershipaddress2 ? <div>Address: {order.ordershipaddress2}</div> : null}
                                        <div>City: {order.ordercity}</div>
                                        <div>State: {order.orderstate}</div>
                                        <div>Zip: {order.orderzip}</div>
                                        <div>Email: {order.orderemail}</div>
                                        {order.ordershipped ? <div>Shipped: Yes</div> : <div>Shipped: No</div>}
                                        <div>Tracking Number: {order.ordertrackingnumber}</div>
                                        <br />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <button className='back-button' onClick={() => navigate(-1)}>Go Back</button>
                </div>
                : <p>You are not authorized to be on this page</p>
            }
        </>
    )
}