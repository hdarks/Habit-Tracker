import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import './auth.css';
import { useNavigate } from "react-router-dom";

export default function LoginComponent() {
    const { login, auth } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
        } catch (err) {
            setError(err.response?.data?.message || 'Login Failed');
        }
    };

    useEffect(() => {
        if (auth?.role) {
            navigate('/');
        }
    }, [auth, navigate]);

    return (
        <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}