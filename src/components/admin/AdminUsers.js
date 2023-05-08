import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function AdminUsers({ isAdmin }) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await fetch(`http://localhost:4000/api/users`, {
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
                <div>
                    <h1>All Users</h1>
                    <div className="adminUsers">
                        {users.map((user) => {
                            return (
                                <div key={user.id}>
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
                </div>
                : 'You are not authorized to be on this page'
            }
        </>
    )
}