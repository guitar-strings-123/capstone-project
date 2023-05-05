import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import React from 'react';

export default function SingleProduct() {
    const [product, setProduct] = useState('')
    const navigate = useNavigate()
    const { productId } = useParams()

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/products/${productId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                let result = await response.json();
                console.log(result);
                setProduct(result)
            } catch (err) {
                console.error(err);
            }
        }
        getProduct()
    }, [])

    return (
        <>
            <div className="title">
                {product ?
                    <div className="productCard">
                        <p style={{ marginBottom: 0, padding: 0 }}>
                            {product.name} : ${product.price}
                            <br />
                            {product.description}
                        </p>
                    </div> :
                    <p>Error loading products</p>
                }
            </div>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </>
    );
}