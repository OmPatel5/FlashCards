import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from 'react-router-dom';




export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const { login, logout, currentUser } = useAuth();


    useEffect(() => {
        if (!currentUser) {
            localStorage.clear();
        }

        return () => {
            setError('');
        }
    }, [])

    async function handleLogin(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);

            await login(email, password);

            console.log('successful')

            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            localStorage.setItem("authenticated", "true");

            console.log('successful 2')



            history.push('/topics')
        } 
        catch(err) {
            console.log(err)
            setError(err.message)
        }

        setLoading(false);
    }

    return (
        <div class="loginFrm">
    
            <form className="form" onSubmit={handleLogin}>
                <div className="pic">
                    <img className = "loginPhoto" src="https://img.freepik.com/free-vector/business-team-putting-together-jigsaw-puzzle-isolated-flat-vector-illustration-cartoon-partners-working-connection-teamwork-partnership-cooperation-concept_74855-9814.jpg?w=2000&t=st=1676085260~exp=1676085860~hmac=1e660842920805315092856ed739be2fa4978a3fd91c3af768f29fd566e26424" /> 
                </div>

                <div className="signUpSection">
                    <h1 className="title">Log In</h1>

                    <div className="inputContainer">
                        <input type="text" className="input" onChange={(e) => setEmail(e.target.value)}/>
                        <label for="" className="label">Email</label>
                    </div>

                    <div className="inputContainer">
                        <input type="text" className="input" onChange={(e) => setPassword(e.target.value)}/>
                        <label for="" className="label">Password</label>
                    </div>

                    {error && <div>{error}</div>}

                    <p>Don't have an account yet? <Link to="/register">Sign Up!</Link></p>

                    <input type="submit" className="submitBtn" value="Log In" />
                </div>
            </form>
        </div>
    )
}