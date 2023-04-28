import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddProduct() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const { isAdmin } = useParams()

    async function addProduct(event) {
        event.preventDefault()

        try {
            const response = await fetch(`http://localhost:4000/api/products`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    price: price
                })
            })
            const result = await response.json()
        } catch (err) {
            console.log(err)
        } finally {
            if (isAdmin) {
                console.log('Product successfully added!')
                navigate('/AdminProducts')
            } else {
                alert("you do not have authorization")
                navigate('/AdminProducts')
            }
        }
    } 

    return (
        <div className="add-product-container" >
            <form onSubmit={addProduct}>
                <h1>Add a Product</h1>
                <div>
                    <label htmlFor="name"></label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description"></label>
                    <input
                        type="text"
                        id="description"
                        placeholder="Product Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="price"></label>
                    <input
                        type="text"
                        id="price"
                        placeholder="Product Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <button className="submit-btn" type="submit">Add Product</button>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </form>
        </div>
    );

}