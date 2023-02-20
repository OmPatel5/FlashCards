import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";


export function Authentication() {
    const [error, setError] = useState('');

    const { signup, currentUser, login } = useAuth();

    const history = useHistory();

    const [verificationInput, setVerificationInput] = useState('');


    useEffect(() => {
        if (!localStorage.code) {
            const code = Math.floor(100000 + Math.random() * 900000);
            const now = new Date().getTime();

            localStorage.setItem("code", code);
            localStorage.setItem('setupTime', now);       

            Axios.post('https://flashcards-api-zrei.onrender.com/sendEmail', {
                verification_code: code,
                email: localStorage.email
            }).then((result) => {
                console.log(result)
            })
        }

        else {
            const hours = 1; 

            const now = new Date().getTime();
            const setupTime = localStorage.getItem('setupTime');     
            
            if(now - setupTime > hours*1000*60*60) {
                console.log('e')
                localStorage.clear()
                localStorage.setItem('setupTime', now);
            }
        }

    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(verificationInput)
        console.log(localStorage.code)
        if (verificationInput === localStorage.code) {
            setError('Verified Successfully!')

            try {
                const email = localStorage.email;
                const password = localStorage.password;
                const isLoggingIn = localStorage.isLoggingIn;

                if (isLoggingIn === "false") {
                    const username = localStorage.username;
                    await signup(email, password, username);
                }

                localStorage.setItem("authenticated", "true");


                history.push('/topics')
            } 

            catch(err) {
                setError(err.message)
            }

        }

        else {
            setError('Verification Code is Wrong.');
        }
    }

    return (
        <div className="auth">
                <div className="authSection">
                    <h1 className="authTitle">Authentication</h1>
                    <p>A 6 digit pin has been sent to your email to verify its you. It will expire in 1 hour.</p>

                    <div>{error}</div>

                    <form onSubmit={handleSubmit}>
                        <h3>Please Enter 6 Digit Code Here: </h3>
                        <input onChange={(e) => setVerificationInput(e.target.value)}/>

                        <input type="submit" className="submitBtn" value="Confirm" />
                    </form>
                </div>
        </div>
    )
}