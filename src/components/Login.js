import {useEffect, useState } from 'react';

export default function Login () {

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

            let result = await response.json();
            console.log(result)

        } catch(err) {
            console.error(err)
        }
    }
    loginUser()
    return (
        <form onSubmit={(event) => loginUser(event)}>
            <label>Username:</label>
            <input type="text" value={userName} onChange={(event) => setUserName(event.target.value)}></input>
            <label>Password:</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
            <button type="submit">Login</button>
        </form>
    )
}