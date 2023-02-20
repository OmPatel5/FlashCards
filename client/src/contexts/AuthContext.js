import Axios from 'axios';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { auth } from "../firebase-config";
import { useHistory } from 'react-router-dom';

const AuthContext = React.createContext(); 

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const history = useHistory();

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const [username, setUsername] = useState('');

    async function signup(email, password, username) {
        console.log(username)
        const registeredUser = await createUserWithEmailAndPassword(auth, email, password);
        console.log(registeredUser)

        setUsername(username);


        await Axios.post('https://flashcards-api-zrei.onrender.com/createUser', {
            userid: registeredUser.user.uid,
            username: username
        })

        return;
    }


    async function login(email, password) {
        const loggedInUser = await signInWithEmailAndPassword(auth, email, password);

        await Axios.get('https://flashcards-api-zrei.onrender.com/getUsers').then((response) => {
            response.data.map((users) => {
                try {
                    if (users.userid === loggedInUser.user.uid) {
                        setUsername(users.username);
                        history.push('/topics')
                    }
                } catch {
                    history.push('/login')
                }
            })
        })
        
        
    }

    function logout() {
        return auth.signOut();
    }





    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            await Axios.get('https://flashcards-api-zrei.onrender.com/getUsers').then((response) => {
                response.data.map((users) => {
                    try {
                        if (users.userid === user.uid) {
                            setUsername(users.username); 
                            history.push('/topics')
                        }
                    } catch(error) {
                        console.log(error)
                    }
                })
            })

            console.log(user)

            setCurrentUser(user)
            setLoading(false)
        }) 

        return unsubscribe;
    }, [])
    

    const value = {
        currentUser,
        signup,
        login,
        username,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}