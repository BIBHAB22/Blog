// app/blog/page.js
import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

const fetchFirestoreBlogs = async () => {
    const blogsCollection = collection(db, 'blogs');
    const blogsSnapshot = await getDocs(blogsCollection);
    return blogsSnapshot.docs.map((doc) => ({
        id: doc.id,        // Make sure to capture the document ID
        ...doc.data(),
    }));
};

const Blog = async () => {
    const firestoreBlogs = await fetchFirestoreBlogs();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {firestoreBlogs.map((blog) => (
                    <div key={blog.id} className="rounded-lg shadow-md overflow-hidden">
                        <img src={blog.imageUrl} alt={blog.title} className="w-full h-64 object-cover" />
                        <div className="p-4">
                            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                            <p className="mb-4">{blog.description}</p>
                            <div className="text-sm mb-4">
                                <span>By {blog.author}</span> |{' '}
                                <span>
                                    {new Date(blog.date).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </span>
                            </div>
                            <Link href={`/blog/${blog.id}`} className={buttonVariants({ variant: 'outline' })}>
                                Click here
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
