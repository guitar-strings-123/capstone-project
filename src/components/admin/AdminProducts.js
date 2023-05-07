import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function AdminProducts({isAdmin}) {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await fetch(`http://localhost:4000/api/products`, {
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
        getProducts()
    }, [])

    return (
        <>
            {
                isAdmin ?
                    <div id='test'>
                        <h1>Product Page</h1>
                        <div className="adminProduct">
                            {products.map((product) => {
                                return (
                                    <div key={product.id}>
                                        <div>Name: {product.name}</div>
                                        <div>Description: {product.description}</div>
                                        <img src={"https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg"} width="100"/>
                                        <div>$ {product.price}</div>
                                        <br/>
                                    </div>
                                )
                            })}
                        </div>
                        <Link to='/AddProduct'>
                            <button>Add Product</button>
                        </Link>
                        <button onClick={() => navigate(-1)}>Go Back</button>
                    </div>
                    : 'You are not authorized to be on this page'
            }
        </>
    )
}