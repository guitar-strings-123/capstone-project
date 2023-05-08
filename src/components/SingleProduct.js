import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';

export default function SingleProduct({DB}) {
    const [product, setProduct] = useState('')
    const navigate = useNavigate()
    const { productId } = useParams()

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await fetch(`${DB}/api/products/${productId}`, {
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
            <div className="single-product-page">
                {product ?
                    <div className="single-product-card">
                        <p style={{ marginBottom: 0, padding: 0 }}>
                            {product.name} : ${product.price}
                            <br />
                            {product.description}
                            <br />
                            <img src={product.imgurl} width='150' />
                        </p>
                        <button className='add-to-cart'>Add To Cart</button>
                    </div> :
                    <p>Error loading products</p>
                }
                <button className='back-button' onClick={() => navigate(-1)}>Go Back</button>
            </div>
        </>
    );
}