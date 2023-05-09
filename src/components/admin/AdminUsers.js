import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminUsers({ isAdmin, DB }) {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await fetch(`${DB}/api/users`, {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                const result = await response.json()
                setUsers(result)
            } catch (err) {
                console.log(err)
            }
        }
        getUsers()
    }, [])

    return (
        <>
            {isAdmin ?
                <div className="title">
                    <div className="products-container">
                        {users.map((user) => {
                            return (
                                <div className="productCard" key={user.id}>
                                    <div>Username: {user.username}</div>
                                    <div>Email: {user.useremail}</div>
                                    <div>First Name: {user.userfirstname}</div>
                                    <div>Last Name: {user.userlastname}</div>
                                    <div>Location: {user.userlocation}</div>
                                    {user.active ? <div>Active: Yes</div> : <div>Active: No</div>}
                                    {user.isadmin ? <div>Admin: Yes</div> : <div>Admin: No</div>}
                                    <br />
                                </div>
                            )
                        })}
                    </div>
                    <button className='back-button' onClick={() => navigate(-1)}>Go Back</button>
                </div>
                : <p>You are not authorized to be on this page</p>
            }
        </>
    )
}