import React from 'react';
import {  Navigate} from "react-router-dom";

export const GuardedRoute = ({children}) => {
    const auth = localStorage.getItem('token');
    return auth ? children : <Navigate to="/auth/login" />;
}