import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
    const { auth, logout } = useAuth();
    const navigate = useNavigate();

    if (!auth?.token) return null;

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <nav className="navbar">
            <div className="nav-left">
                <h2>Habit Tracker</h2>
            </div>

            <div className="nav-right">
                {auth.role === 'user' && (
                    <>
                        <Link to='/user/dashboard'>Dashboard</Link>
                        <Link to='/user/goals'>Goals</Link>
                    </>
                )}
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}