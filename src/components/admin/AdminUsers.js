import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminUsers({ user, DB }) {
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
            {user.isadmin ?
                <div className="title">
                    <div className="products-container">
                        {users.map((usr) => {
                            return (
                                <div className="productCard" key={usr.id}>
                                    <div>Username: {usr.username}</div>
                                    <div>Email: {usr.useremail}</div>
                                    <div>First Name: {usr.userfirstname}</div>
                                    <div>Last Name: {usr.userlastname}</div>
                                    <div>Street: {usr.useraddress}</div>
                                    <div>City: {usr.usercity}</div>
                                    <div>State: {usr.userstate}</div>
                                    <div>Zip/Postal: {usr.userzip}</div>
                                    {usr.active ? <div>Active: Yes</div> : <div>Active: No</div>}
                                    {usr.isadmin ? <div>Admin: Yes</div> : <div>Admin: No</div>}
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