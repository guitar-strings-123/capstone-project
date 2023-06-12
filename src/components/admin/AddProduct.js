import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/Admin.css'

export default function AddProduct({ user, DB }) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
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
                    price: price,
                    categoryID: categoryID,
                    isadmin: user.isadmin
                })
            })
            const result = await response.json()
        } catch (err) {
            console.log(err)
        } finally {
            if (user.isadmin) {
                console.log('Product successfully added!')
                navigate('/AdminProducts')
            } else {
                alert("you do not have authorization")
                navigate('/AdminProducts')
            }
        }
    }

    return (
        <div id="contentContainer" >
            <form id="addProductCard" onSubmit={addProduct}>
                <h1 id="addProductHeader">Add a Product</h1>
                <div>
                    <span>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Product Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </span>
                </div>
                <div>
                    <span>
                        <label htmlFor="description">Desc.</label>
                        <input
                            type="text"
                            id="description"
                            placeholder="Product Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </span>
                </div>
                <div>
                    <span>
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            id="price"
                            placeholder="Product Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </span>
                </div>
                <div>
                    <span>
                        <label htmlFor="categoryId">Category</label>
                        <select name="categoryId" id="categoryId" value={categoryID} onChange={(e) => setCategoryID(e.target.value)}>
                            <option value="1">Classical</option>
                            <option value="2">Acoustic</option>
                            <option value="3">Electronic</option>
                        </select>
                    </span>
                </div >
                <span>
                    <button className="submit-btn" type="submit">Add Product</button>
                    <button type="button" onClick={() => navigate(-1)}>Go Back</button>
                </span>
            </form >
        </div >
    );
}
