// app/sign-up/page.js
'use client'
import React, { useRef } from "react";
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '@/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; // Import your Firestore instance
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const router = useRouter();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const phoneRef = useRef();

    const signup = async (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const phone = phoneRef.current.value;

        if (password.length < 6) {
            toast.error('Password must be greater than 6 characters.'); // Show error toast
            return; // Exit the function if the password is too short
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Set user's display name
            await updateProfile(user, { displayName: name });

            // Store additional user information like phone in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                name,
                email,
                phone,
            });

            toast.success('Successfully signed up! Redirecting to the Home page.');
            setTimeout(() => {
                router.replace('/');
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            toast.error(`Sign Up failed!! Try again`); // Show error message as toast
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <ToastContainer />
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
                    Sign Up
                </h1>
                <form onSubmit={signup} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            ref={nameRef}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400 dark:text-gray-100"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            ref={emailRef}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400 dark:text-gray-100"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            placeholder="Enter your phone number"
                            ref={phoneRef}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400 dark:text-gray-100"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            ref={passwordRef}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400 dark:text-gray-100"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-300 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 text-center">
                    Already have an account?{' '}
                    <span 
                        className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                        onClick={() => router.push('/login')}
                    >
                        Log in here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
