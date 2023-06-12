import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../../style/Admin.css'

export default function AdminProducts({ user, DB }) {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await fetch(`${DB}/api/products`, {
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
                user.isadmin ?
                    <>
                        <div className="title">
                            <div className="container">
                                <div className="controls">
                                    <Link to='/AddProduct'>
                                        <button className='back-button'>Add Product</button>
                                    </Link>
                                    <button className='back-button' onClick={() => navigate(-1)}>Go Back</button>
                                </div>
                                <div className='products-container'>
                                    {products.map((product) => {
                                        return (
                                            <div className="productCard" key={product.id}>
                                                <div className="cardTitle">
                                                    <p style={{ marginBottom: 0, padding: 0 }}>
                                                        {product.name} : {product.price}
                                                        <br />
                                                        {product.description}
                                                    </p>
                                                </div>
                                                {product.imgurl ? <img className="imgSmall" src={product.imgurl} /> : <img className="imgSmall" src="https://media.guitarcenter.com/is/image/MMGS7/L93981000002000-00-720x720.jpg" />}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </>
                    : <p className="noAuthorization">You are not authorized to be on this page</p>
            }
        </>
    )
}
