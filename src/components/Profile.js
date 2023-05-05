import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Profile(){
    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/orders', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                let result = await response.json();
                console.log(result);
            } catch(err) {
                console.error(err)
            }
            console.log('this worked')
        }
        getOrders()
    }, [])

    return (
        <div>testing</div>
    )
}
