import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('authToken') || null,
        user: JSON.parse(localStorage.getItem('authUser')) || null,
    });
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('authToken', authState.token);
        localStorage.setItem('authUser', JSON.stringify(authState.user));
    }, [authState]);

    const login = (data) => {
        setAuthState({ token: data.token, user: data.user });
        navigate('/memories');
    };

    const logout = () => {
        setAuthState({ token: null, user: null });
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        navigate('/login');
    };

    const register = (data) => {
        setAuthState({ token: data.token, user: data.user });
        navigate('/memories');
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
