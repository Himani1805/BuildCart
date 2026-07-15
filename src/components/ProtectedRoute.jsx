import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
    // Extracting the active session token state variable from global storage slice
    const { token } = useSelector((state) => state.auth);

    // Fallback redirection logic context if the authorization parameter is invalid
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Permitting navigation workflow to display children components matching requested path
    return <Outlet />;
}

export default ProtectedRoute;