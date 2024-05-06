import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useUser = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            setUser(user);
            setIsLoading(false);
            localStorage.setItem('accessToken', user.accessToken);
            // here you can display accesstoken to see 
            setAccessToken(user.access_token);
        });
        return unsubscribe;
    }, [])

    const userEmail = user ? user.email : null;
    console.log("This is user", user);

    return { user, userEmail, isLoading };

}

export default useUser;