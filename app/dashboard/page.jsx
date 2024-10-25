// app/dashboard/page.jsx
'use client'
import React, { useEffect, useState } from 'react';
import useAuth from '@/app/hooks/Useauth'; // Ensure you have the correct path
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '@/firebaseConfig'; // Import your Firestore instance

const Dashboard = () => {
    const { user, loading, logout } = useAuth(); // Get the user from the useAuth hook
    const router = useRouter();
    const [phone, setPhone] = useState(null); // State to hold phone number

    // Redirect to login page if the user is not logged in and loading is complete
    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login');
        }
    }, [loading, user, router]);

    // Fetch user's phone number from Firestore when user is available
    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const userDoc = doc(db, 'users', user.uid);
                const docSnap = await getDoc(userDoc);

                if (docSnap.exists()) {
                    setPhone(docSnap.data().phone); // Get the phone number from Firestore
                } else {
                    console.log('No such document!');
                }
            }
        };

        fetchUserData();
    }, [user]);

    // Show a loading message while checking authentication
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Dashboard</h1>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center">
                {/* Check if user exists before accessing its properties */}
                {user ? (
                    <>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                            Welcome, {user.displayName || 'User'}!
                        </h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">You are logged in. Here are your details:</p>
                        <ul className="list-disc list-inside mt-4 text-left">
                            <li className="text-gray-600 dark:text-gray-300">Email: {user.email}</li>
                            <li className="text-gray-600 dark:text-gray-300">Phone No: {phone || 'Phone number not available'}</li>
                        </ul>
                        <button
                            onClick={logout}
                            className="mt-4 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-300"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">No user data found.</h2>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
