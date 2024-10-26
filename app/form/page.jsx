'use client';
import React, { useState } from 'react';
import { db } from '@/firebaseConfig'; // Ensure you have configured Firebase
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogSubmissionForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState(''); // Fixed: Use 'setAuthor' instead of 'setauthor'
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // corrected variable name
    const [content, setContent] = useState('');
    const [date, setDate] = useState(''); // new state for date

    const handleSubmit = async (e) => {
        e.preventDefault();

        const blogData = {
            title,
            author,
            description,
            tags: tags.split(',').map(tag => tag.trim()), // Split tags by comma
            imageUrl, // corrected variable name
            content,
            date: date || Timestamp.now() // Use date from input or current time if empty
        };

        try {
            const docRef = await addDoc(collection(db, 'blogs'), blogData);
            toast.success('Blog submitted successfully!');
            // Clear the form after successful submission
            setTitle('');
            setAuthor(''); // Corrected: Clear author field
            setDescription('');
            setTags('');
            setImageUrl(''); // corrected variable name
            setContent('');
            setDate(''); // clear date field
        } catch (error) {
            console.error('Error submitting the blog', error);
            toast.error('Failed to submit the blog');
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Submit a New Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Author
                    </label>
                    <input
                        type="text"
                        value={author} // Fixed: Use 'author' instead of 'title'
                        onChange={(e) => setAuthor(e.target.value)} // Fixed: Update correct author state
                        required
                        className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Date
                    </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        // Remove required if you want to make the date optional
                        className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tags (comma-separated)
                    </label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Image URL
                    </label>
                    <input
                        type="text"
                        value={imageUrl} // corrected variable name
                        onChange={(e) => setImageUrl(e.target.value)} // corrected variable name
                        required
                        className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Content
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
                >
                    Submit Blog
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default BlogSubmissionForm;
