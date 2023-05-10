import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/Profile.css'

export default function Profile({DB}) {

    const [myOrders, setMyOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await fetch(`${DB}/api/orders/`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                let result = await response.json();
                console.log(result);
                setMyOrders(result)
            } catch (err) {
                console.error(err)
            }
            console.log('this worked')
        }
        console.log(`MY ORDERS: ${myOrders}`)
        getOrders()
    }, [])

    const username = localStorage.getItem('username');
    const userID = localStorage.getItem('userID');
    const admin = localStorage.getItem('isAdmin');
    const email = localStorage.getItem('useremail');
    const location = localStorage.getItem('userlocation');
    const firstname = localStorage.getItem('userfirstname');
    const lastname = localStorage.getItem('userlastname');


    return (
        // username?<div>${username}</div>:null
        <>
            {username ?

                <div id='profile-container'>
                    {firstname ? <div id='welcome'>Welcome back, {firstname}!</div> : <div id='welcome'>Welcome back!</div>}

                    <div id='userInfo-container'>
                        <div
                            className="infoStyle">Username:
                            {username ? <div>{username}</div> : null}
                        </div>

                        <div
                            className='infoStyle'>UserID:
                            {userID ? <div id='testing'>{userID}</div>
                                : <div>no ID</div>}
                        </div>

                        <div
                            className='infoStyle'>Email:
                            {email ? <div>{email}</div>
                                : <div>No email provided</div>}
                        </div>

                        <div
                            className='infoStyle'>Location:
                            {location ? <div>{location}</div> : null}
                        </div>

                        {admin === 'true' ? <div>Admin Enabled</div> : null}
                    </div>
                    
                    <div id='prevOrderText'>Previous Orders:</div>
                    {
                        myOrders.map(order => {

                            return (
                                <div id='orderContainer'>
                                    {order.orderemail === email ?
                                        <div key={order.orderid} className='orders'>
                                            <div className='orderInfo'>OrderID: {order.orderid}</div>

                                            <div className='orderInfo'>Shipped to: {order.ordershipaddress}, {order.ordercity}, {order.orderstate}, {order.orderzip}</div>

                                            <div className='orderInfo'>Order name: {order.ordershipname}</div>
                                            <div className='orderInfo'>Order email: {order.orderemail}</div>
                                            {
                                                order.ordershipped === false ?
                                                    <>
                                                        <div className='orderInfo'>Order not shipped</div>
                                                    </>
                                                    : <div className='orderInfo'>Order is on the way!</div>
                                            }
                                        </div>
                                        : null}
                                </div>
                            )
                        })
                    }

                </div>

                : <div className='notLoggedIn'>please log in</div>}
        </>

    )
}
