import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const login = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
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
                <input type='text' placeholder='Enter your email address' value={email} onChange={e => setEmail(e.target.value)} />
                <input type='password' placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
                <button onClick={login}>Login</button>

            </div>
            <div>
                <Link to='/Signup'> Don't have an account? </Link>
            </div>

        </>
    )
}

export default Login