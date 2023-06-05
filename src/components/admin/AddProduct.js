import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddProduct({ isAdmin, DB }) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [categoryID, setCategoryID] = useState(0)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    async function addProduct(event) {
        event.preventDefault()

        try {
            const response = await fetch(`${DB}/api/products`, {
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
                <div>
                    <label htmlFor="categoryId">Category</label>
                    <select name="categoryId" id="categoryId" value={categoryID} onChange={(e) => setCategoryID(e.target.value)}>
                        <option value="1">Classical</option>
                        <option value="2">Acoustic</option>
                        <option value="3">Electronic</option>
                    </select>
                </div >
                <button className="submit-btn" type="submit">Add Product</button>
            </form >
                <button onClick={() => navigate(-1)}>Go Back</button>
        </div >
    );
}
