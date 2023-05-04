import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function AdminProducts() {
    const { isAdmin } = useParams()
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
                    <div>
                        <h1>Product Page</h1>
                        <div className="adminProduct">
                            {products.map((product) => {
                                return (
                                    <div key={product.id}>
                                        <div>{product.name}</div>
                                        <div>{product.description}</div>
                                        <div>{product.price}</div>
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