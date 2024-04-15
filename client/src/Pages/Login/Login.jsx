import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

import "./Login.css"


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const login = async () => {
        try {
            const response = await signInWithEmailAndPassword(getAuth(), email, password);
            const data = JSON.stringify(response);
            console.log(data);
            navigate('/articles')
        } catch (e) {
            setError(e.message);
        }
    }
    return (
        <>
            <div>
                <h1>Login page</h1>
                {error && <p className='error'>{error}</p>}
                <input type='text' className='email-container' placeholder='Enter your email address' value={email} onChange={e => setEmail(e.target.value)} /><br />
                <input type='password' className='password-container' placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} /><br />
                <button onClick={login}>Login</button>

            </div>
            <div>
                <Link to='/Signup'> Don't have an account? </Link>
            </div>

        </>
    )
}

export default Login