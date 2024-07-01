import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ token: null, user: null });
    const navigate = useNavigate();




    const login = (data) => {
        console.log("data", data)
        setAuthState({ token: data.token, user: data.user });
        localStorage.setItem('authToken', data.token);
        navigate('/memories');
    };

    const logout = () => {
        setAuthState({ token: null, user: null });
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const register = (data) => {
        setAuthState({ token: data.token, user: data.user });
        localStorage.setItem('authToken', data.token);
        navigate('/memories');
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
