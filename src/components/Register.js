import React from "react";
import { useState, useEffect } from 'react';


export default function Register({setToken}) {
    const [newUserName, setNewUserName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newLocation, setNewLocation] = useState("");


    const newUser = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch("http://localhost:4000/api/users/register/", {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({
                    username: newUserName,
                    password: newPassword,
                    userEmail: newEmail,
                    userFirstName: newFirstName,
                    userLastName: newLastName,
                    userLocation: newLocation,
                }),
            }
            );


            const result = await response.json();
            console.log(result)
            setToken(result.token)
            localStorage.setItem('token', result.token)
        } catch (err) {
            console.error(err)
        }
    }


    return (
        <div className="title">
            <form onSubmit={(event) => newUser(event)}>
                <label>New Username:</label>
                <input
                    type="text"
                    value={newUserName}
                    onChange={(event) => setNewUserName(event.target.value)}
                ></input>
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                ></input>
                <label>First name:</label>
                <input
                    type="text"
                    value={newFirstName}
                    onChange={(event) => setNewFirstName(event.target.value)}
                ></input>
                <label>Last name:</label>
                <input
                    type="text"
                    value={newLastName}
                    onChange={(event) => setNewLastName(event.target.value)}
                ></input>
                <label>Email:</label>
                <input
                    type="text"
                    value={newEmail}
                    onChange={(event) => setNewEmail(event.target.value)}
                ></input>
                <label>Your location:</label>
                <input
                    type="text"
                    value={newLocation}
                    onChange={(event) => setNewLocation(event.target.value)}
                ></input>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}
