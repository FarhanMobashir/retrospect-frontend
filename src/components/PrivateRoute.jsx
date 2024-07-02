import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AppLayout from './AppLayout';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const { authState } = useContext(AuthContext);
    console.log(authState)
    return authState.token ? <AppLayout><Element {...rest} /></AppLayout> : <Navigate to="/login" />;
};

export default PrivateRoute;
