import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import './auth.css';
import { useNavigate } from "react-router-dom";

export default function RegisterComponent() {
    const { register, auth } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ name, email, password });
        } catch (err) {
            setError(err.response?.data?.message || 'Registration Failed');
        }
    };

    useEffect(() => {
        if (auth?.role) {
            navigate('/');
        }
    }, [auth, navigate]);

    return (
        <div className="auth-form">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <button type="submit">Register</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}