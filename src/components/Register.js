import React from "react";
import { useState, useEffect } from 'react';

export default function Register({ token, setToken }) {
    const [newUserName, setNewUserName] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const newUser = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch('http://localhost4000/api/users/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: newUserName,
                    password: newPassword,
                }),
            }
            );

            let result = await response.json();
            console.log(result)
        } catch (err) {
            console.error(err)
        }
    }

    return (
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
            <button type="submit">Register</button>
        </form>
    )
}