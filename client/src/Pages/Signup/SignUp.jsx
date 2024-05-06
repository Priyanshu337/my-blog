import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const signup = async () => {
        try {
            if (password === confirmPassword) {
                setError('password and confirm password do not match');
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
            console.log("User crearted successfully");
            navigate('/articles')
        } catch (e) {
            setError(e.message);
        }
    }


    return (
        <>
            <div>
                <h1>Signup page</h1>
                {error && <p className='error'>{error}</p>}
                <input type='text' placeholder='Enter your email address' value={email} onChange={e => setEmail(e.target.value)} />
                <input type='password' placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
                <input type='password' placeholder='Enter your Confirm Password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                <button onClick={signup}>Signups</button>
            </div>
            <Link to='/login'> Already have an account? Login Here</Link>
        </>
    )
}

export default SignUp