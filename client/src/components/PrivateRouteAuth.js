import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRouteToAuth({ component: Component, ...rest}) {
    const { currentUser } = useAuth();

    console.log(localStorage.isLoggingIn)
    return (
        <Route
            {...rest}
            render={props => {
                return localStorage.isLoggingIn !== undefined ? <Component {...props} /> : <Redirect to="/login" />
            }}
        >

        </Route>
    ) 
}