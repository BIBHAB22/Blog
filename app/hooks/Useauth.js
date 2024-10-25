import { useEffect, useState } from 'react';
import { auth } from '@/firebaseConfig'; // Make sure to import your Firebase auth
import { onAuthStateChanged, signOut } from 'firebase/auth';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null); // Update the user state after logout
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return { user, loading, logout }; // Return the logout function
};

export default useAuth;
