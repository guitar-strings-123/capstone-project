import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/Profile.css'

export default function Profile() {
    // useEffect(() => {
    //     const getOrders = async () => {
    //         try {
    //             const response = await fetch('http://localhost:4000/api/orders', {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer `
    //                 },
    //             });
    //             let result = await response.json();
    //             console.log(result);
    //         } catch(err) {
    //             console.error(err)
    //         }
    //         console.log('this worked')
    //     }
    //     getOrders()
    // }, [])

    const username = localStorage.getItem('username');
    const userID = localStorage.getItem('userID');
    const admin = localStorage.getItem('isAdmin')

    return (
        // username?<div>${username}</div>:null
        <div>
            {
                username ? <div id="testing">{username}</div> : null

            }
            {

                userID ? <div id='testing'>{userID}</div> : null
            }
            {
                admin === 'true' ? <div>Admin Enabled</div> : null
            }
        </div>

    )
}
