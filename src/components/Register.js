import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../style/Register.css";


export default function Register({ token, setToken, DB }) {
    const [newUserName, setNewUserName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            // wait 3 seconds and then redirect to home if token
            if (token) {
                navigate('/');
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, [token]);

    const newUser = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`${DB}/api/users/register/`, {
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
            localStorage.setItem('username', result.user.username)
            localStorage.setItem('userLocation', result.user.userLocation)
            localStorage.setItem('userlastname', result.user.userlastname)
            localStorage.setItem('userfirstname', result.user.userfirstname)
            localStorage.setItem('userlocation', result.user.userlocation)
            localStorage.setItem('useremail', result.user.useremail)

        } catch (err) {
            console.error(err)
        }
    }


    return (
        <div id="registerContent">
            <div className="registerCard">
                <form onSubmit={(event) => newUser(event)}>
                    {
                        token ? (
                            <div id="redirectContainer">
                                <div>Logged in.</div>
                                <div>Redirecting...</div>
                            </div>
                        )
                            : (
                                <>
                                    <div id="username">
                                        <label id="usernameLabel">New Username</label>
                                        <input
                                            type="text"
                                            value={newUserName}
                                            onChange={(event) => setNewUserName(event.target.value)}
                                        ></input>
                                    </div>
                                    <div id="password">
                                        <label id="passwordLabel">New Password</label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(event) => setNewPassword(event.target.value)}
                                        ></input>
                                    </div>
                                    <div id="firstName">
                                        <label id="firstNameLabel">First Name</label>
                                        <input
                                            type="text"
                                            value={newFirstName}
                                            onChange={(event) => setNewFirstName(event.target.value)}
                                        ></input>
                                    </div>
                                    <div id="lastName">
                                        <label id="lastNameLabel">Last Name</label>
                                        <input
                                            type="text"
                                            value={newLastName}
                                            onChange={(event) => setNewLastName(event.target.value)}
                                        ></input>
                                    </div>
                                    <div id="email">
                                        <label id="emailLabel">Email</label>
                                        <input
                                            type="text"
                                            value={newEmail}
                                            onChange={(event) => setNewEmail(event.target.value)}
                                        ></input>
                                    </div>
                                    <div id="location">
                                        <label id="locationLabel">Address</label>
                                        <input
                                            type="text"
                                            value={newLocation}
                                            onChange={(event) => setNewLocation(event.target.value)}
                                        ></input>
                                    </div>
                                    <button type="submit">Register</button>
                                    <div id="loginContainer">Already registered? <Link to="../Login">Login here</Link></div>
                                </>
                            )
                    }
                </form>
            </div>
        </div>
    )
}
