import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const { authState } = useContext(AuthContext);
    console.log(authState)
    return authState.token ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
