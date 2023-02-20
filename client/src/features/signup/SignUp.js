import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from 'react-router-dom';


export function SignUp() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    useEffect(() => {
        localStorage.clear();
    }, [])

    async function handleSignUp(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError('Passwords do not match!');      
        }

        try {
            setError('');
            setLoading(true);

            localStorage.setItem("email", email);
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            localStorage.setItem("isLoggingIn", "false")

            history.push('/authentication')
        } 
        catch(err) {
            setError(err.message)
        }

        setLoading(false);
    }


    return (
        <div className="signupFrm">
    
            <form className="form" onSubmit={handleSignUp}>
                <div className="pic">
                    <img className = "signupPhoto" src="https://img.freepik.com/free-vector/digital-designers-team-drawing-with-pen-computer-monitor_74855-10586.jpg?w=2000&t=st=1675991575~exp=1675992175~hmac=7aa07b6ff0f2ef5c85a5b8b3f81d971590a938cd72a3762e75d6ec61147741ef" alt="Designers Team Working" /> 
                </div>

                <div className="signUpSection">
                    <h1 className="title">Sign up</h1>
                    <div className="inputContainer">
                        <input type="text" className="input" onChange={(e) => setUsername(e.target.value)}/>
                        <label for="" className="label">Username</label>
                    </div>

                    <div className="inputContainer">
                        <input type="text" className="input" onChange={(e) => setEmail(e.target.value)}/>
                        <label for="" className="label">Email</label>
                    </div>

                    <div className="inputContainer">
                        <input type="text" className="input" onChange={(e) => setPassword(e.target.value)}/>
                        <label for="" className="label">Password</label>
                    </div>

                    <div className="inputContainer">
                        <input type="text" className="input" onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <label for="" className="label">Confirm Password</label>
                    </div>

                    {error && <div>{error}</div>}

                    <p>Already have an account? <Link to="/login" >Log In!</Link></p>
                    <input disabled={loading} type="submit" className="submitBtn" value="Sign up" /> 
                </div>
            </form>
        </div>
    )
}