import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const stored = localStorage.getItem('auth');
        return stored ? JSON.parse(stored) : null;
    });

    useEffect(() => {
        if (auth) {
            localStorage.setItem('auth', JSON.stringify(auth));
        } else {
            localStorage.removeItem('auth');
        }
    }, [auth]);

    const login = async (credentials) => {
        const res = await axios.post('/api/users/login', credentials);
        const user = res.data;
        setAuth(user);
    };

    const register = async (credentials) => {
        const res = await axios.post('/api/users/register', credentials);
        const user = res.data;
        setAuth(user);
    };

    const logout = () => {
        setAuth(null);
    }

    return (
        <AuthContext.Provider value={{ auth, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);