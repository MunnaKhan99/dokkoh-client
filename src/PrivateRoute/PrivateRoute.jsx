import React, { useContext } from 'react';
import { authContext } from '../Layout/RootLayout';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(authContext);
    const { pathname } = useLocation();
    console.log(pathname);
    console.log(user);
    if (loading) {
        return <div>Loading...</div>
    }
    if (!user) {
        return <Navigate state={{ form: location.pathname }} to='/signin'></Navigate >
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;