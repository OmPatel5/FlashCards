import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRouteToLogin({ component: Component, ...rest}) {
    const { currentUser } = useAuth();
    console.log(currentUser)
    return (
        <Route
            {...rest}
            render={props => {
                return currentUser && localStorage.authenticated === "true" ? <Component {...props} /> : <Redirect to="/login" />
            }}
        >

        </Route>
    ) 
}