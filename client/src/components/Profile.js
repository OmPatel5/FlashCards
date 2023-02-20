import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export default function Profile() {
    const [error, setError] = useState();
    const { currentUser, logout, username } = useAuth();

    const history = useHistory();

    async function handleLogout(e) {
        setError('')

        try {
            await logout();
            history.push('/login')
        } catch(err) {
            setError(err)
        }
    }

    
    return (
        <section className="profileCard">
            <h1 className="profileTitle">Profile</h1>

            <h2>Username: {username}</h2>

            <hr />

            <button className="logOutButton" onClick={handleLogout}>Log Out</button>
        </section>
    )
}