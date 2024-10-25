// app/components/CodeSnippet.js
'use client'; // Mark this as a client component

import React from 'react';

const CodeSnippet = ({ code }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(code)
            .then(() => alert('Code copied to clipboard!'))
            .catch(err => console.error('Failed to copy: ', err));
    };

    return (
        <div className="relative mb-4">
            <pre className="bg-gray-100 text-black dark:bg-gray-800 dark:text-white p-4 rounded">
                <code>{code}</code>
            </pre>
            <button 
                onClick={copyToClipboard} 
                className="absolute top-0 right-0 bg-black text-white px-2 py-1 rounded "
            >
                Copy
            </button>
        </div>
    );
};
export default CodeSnippet;
