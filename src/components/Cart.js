import React, { useState, useEffect } from "react";
import { Routes, Route, useParams } from 'react-router-dom';

export default function Cart() {
    let token = localStorage.getItem('token')
    let username = localStorage.getItem('username')
    const [cart, setCart] = useState([])
    const [products, setProducts] = useState([])
    const {userId, cartId} = useParams()

    useEffect(() => {
        async function getCart() {
            try {
                const response = await fetch(`http://localhost:4000/api/cart/${userId}`, {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                const result = await response.json()
                setCart(result)
            } catch (err) {
                console.log(err)
            }
        }
        async function getProducts() {
            try {
                const response = await fetch(`http://localhost:4000/api/cart/${cartId}`, {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                const result = await response.json()
                setProducts(result)
            } catch (err) {
                console.log(err)
            }
        }
        getCart()
        getProducts()
    }, [])

    return (
        <div className="cart page">
            <h1>{username}'s Cart</h1>
            <span>{cart}</span>
            {products.map((product) => {
                return (
                    <div key={product.id}>
                        {product.product_id}
                        {product.quantity}
                    </div>
                )
            })}
        </div>
    )
}