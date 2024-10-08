import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children, NoAuthComponent = null }) => {
    const token = sessionStorage.getItem('authToken');

    if (!token) {
        return NoAuthComponent ? NoAuthComponent : <Navigate to="/" />;
    }

    return children;
};

export default AuthGuard;