import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useContext(UserContext) || {};
    if (!user) {
        return <Navigate to="/auth" />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;