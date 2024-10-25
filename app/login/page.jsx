// app/log-in/page.js
'use client'
import React, { useRef } from "react";
import { auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the toast library

const Login = () => {
    const router = useRouter();
    const logemailRef = useRef();
    const logpasswordRef = useRef();

    const login = async (e) => {
        e.preventDefault();
        const email = logemailRef.current.value;
        const password = logpasswordRef.current.value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            toast.success(`Welcome ${user.displayName}! Redirecting to the home page.`); // Show success toast
            setTimeout(() => {
                router.replace('/');
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            toast.error(`Invalid email or password. Please try again.`); // Show error message as toast
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
                    Log In
                </h1>
                <form onSubmit={login} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            ref={logemailRef}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400 dark:text-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            ref={logpasswordRef}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400 dark:text-gray-100"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-300 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                    >
                        Log In
                    </button>
                </form>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 text-center">
                    Don't have an account?{' '}
                    <span 
                        className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                        onClick={() => router.push('/register')}
                    >
                        Sign up here
                    </span>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
