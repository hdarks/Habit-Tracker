import { useState } from 'react';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';

export default function AuthWrapper() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className='auth-container'>
            {isLogin ? <LoginComponent /> : <RegisterComponent />}
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Need an account?' : 'Already registered?'}
            </button>
        </div>
    );
}