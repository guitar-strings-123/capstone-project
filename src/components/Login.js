import React from "react";
import { useState } from 'react';

export default function Login ({token, setToken}) {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch("http://localhost:4000/api/users/login/", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: userName,
                    password: password,
                })
            })

            const result = await response.json();
            console.log(result);
            setToken(result.token);
            localStorage.setItem('token', result.token)
            localStorage.setItem('username', result.user.username)


        } catch(err) {
            console.error(err)
        }
    }
    
    return (
        <form onSubmit={(event) => loginUser(event)}>
            {token?<div>logged in</div>:null}

            <label>Username:</label>
            <input type="text" value={userName} onChange={(event) => setUserName(event.target.value)}></input>
            <label>Password:</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
            <button type="submit">Login</button>
        </form>
    )
}