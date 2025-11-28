import React from 'react';
import { useAuth } from '../context/AuthContext';
import AuthWrapper from './AuthWrapper';
import DashboardWrapper from './DashboardWrapper';

export default function MainView() {
    const { auth } = useAuth();

    return (
        <div className="main-container">
            {!auth?.token ? (<AuthWrapper />) : (<DashboardWrapper role={auth.role} />)}
        </div>
    );
}