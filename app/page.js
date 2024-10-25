"use client";
import { Button } from "@/components/ui/button";
import Typed from "typed.js";
import React, { useRef, useEffect, useState } from "react";
import { db } from "@/firebaseConfig"; // Adjust the path to your Firebase config
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import Link from 'next/link'; 

export default function Home() {
  // Create reference to store the DOM element containing the animation
  const el = useRef(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Coding",
        "Web Development",
        "Software Engineering",
        "Data Science",
        "Machine Learning",
      ],
      typeSpeed: 50,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsCollection = collection(db, "blogs");

      // Create a query that orders by 'createdAt' and limits to 3 results
      const q = query(blogsCollection, orderBy("date", "desc"), limit(3));

      const blogsSnapshot = await getDocs(q);
      const fetchedBlogs = blogsSnapshot.docs.map((doc) => ({
        id: doc.id, // Capture the document ID
        ...doc.data(),
      }));

      setBlogs(fetchedBlogs); // Save the fetched blogs to state
    };

    fetchBlogs();
  }, []);

  return (
    <main>
      <section className="container px-4 py-10 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
        <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
          <h1 className="text-3xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
            A <span className="font-semibold">free repository</span> for
            community <br className="hidden lg:block" /> components using{" "}
            <span className="font-semibold underline decoration-primary">
              <span ref={el} />
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            Open source Tailwind UI components and templates to{" "}
            <br className="hidden lg:block" /> bootstrap your new apps, projects
            or landing sites!
          </p>
        </div>
        <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
          <img
            src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
            alt="tailwind css components"
            className="w-full h-full max-w-md mx-auto"
          />
        </div>
      </section>

      <section className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
              Pricing Plans
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              Choose the plan that suits you best
            </p>
          </div>
          <div className="flex flex-wrap justify-center">
            {/* Basic Plan */}
            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 transform transition duration-500 hover:scale-105 text-center">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  Basic
                </h3>
                <p className="mt-4 text-gray-500 dark:text-gray-300">
                  $10/month
                </p>
                <ul className="mt-6 mb-6 space-y-4">
                  <li className="text-gray-600 dark:text-gray-400">
                    <s>10GB Storage</s>
                  </li>
                  <li className="text-gray-600 dark:text-gray-400">
                    <s>Basic Support</s>
                  </li>
                  <li className="text-gray-600 dark:text-gray-400">
                    <s>Single User</s>
                  </li>
                  <li className="text-gray-600 dark:text-gray-400">
                    Community Access
                  </li>
                  <li className="text-gray-600 dark:text-gray-400">
                    Weekly Updates
                  </li>
                </ul>
                <Button className="mx-1" variant="outline">
                  Choose Plan
                </Button>
              </div>
            </div>
            {/* Standard Plan */}
            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 transform transition duration-500 hover:scale-105 text-center border-2 border-purple-500">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  Standard
                </h3>
                <p className="mt-4 text-gray-500 dark:text-gray-300">
                  $20/month
                </p>
                <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-purple-500 rounded-full">
                  Bestseller
                </span>
                <ul className="mt-6 mb-6 space-y-4">
                  <li className="text-gray-600 dark:text-gray-400">
                    50GB Storage
                  </li>
                  <li className="text-gray-600 dark:text-gray-400">
                    Priority Support
                  </li>
                  <li className="text-gray-600 dark:text-gray-400">
                    Up to 5 Users
                  </li>
                  <li className="text-gray-600 dark:text-gray-400">
                    Community Access
                  </li>
                  <li className="text-gray-600 dark:text-gray-400">
                    Daily Updates
                  </li>
                </ul>
                <Button className="mx-1" variant="outline">
                  Choose Plan
                </Button>
              </div>
            </div>
            {/* Premium Plan */}
            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 transform transition duration-500 hover:scale-105 text-center">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  Premium
                </h3>
                <p className="mt-4 text-gray-500 dark:text-gray-300">
                  $30/month
                </p>
                <ul className="mt-6 mb-6 space-y-4">
                  <li className="text-gray-600 dark:text-gray-400">
                    200GB Storage
                  </li>
                  <li className="text-gray-600 dark:text-gray-400">
                    24/7 Support
                  </li>
                  <li className="text-gray-600 dark:text-gray-400">
                    Unlimited Users
                  </li>
                  <li className="text-gray-600 dark:text-gray-400">
                    Community Access
                  </li>
                  <li className="text-gray-600 dark:text-gray-400">
                    Real-time Updates
                  </li>
                </ul>
                <Button className="mx-1" variant="outline">
                  Choose Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
              What Our Clients Say
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              Hear from our satisfied customers
            </p>
          </div>
          <div className="flex flex-wrap justify-center">
            {/* Testimonial 1 */}
            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 transform transition duration-500 hover:scale-105 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  "This service has been a game-changer for our business. Highly
                  recommend!"
                </p>
                <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  John Doe
                </h3>
                <p className="text-gray-500 dark:text-gray-300">
                  CEO, Company A
                </p>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 transform transition duration-500 hover:scale-105 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  "Amazing experience! The team was professional and the results
                  were outstanding."
                </p>
                <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Jane Smith
                </h3>
                <p className="text-gray-500 dark:text-gray-300">
                  Marketing Director, Company B
                </p>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 transform transition duration-500 hover:scale-105 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  "Exceptional service and support. We couldn't be happier with
                  the results."
                </p>
                <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Michael Brown
                </h3>
                <p className="text-gray-500 dark:text-gray-300">
                  CTO, Company C
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
              Top Blogs
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              Check out our latest blog posts
            </p>
          </div>
          <div className="flex flex-wrap justify-center">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog.id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
                  <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 transform transition duration-500 hover:scale-105">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                      {blog.title}
                    </h3>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      {blog.description.slice(0, 100)}...
                    </p>
                    <Link href={`/blog/${blog.id}`}>
                      <Button className="mt-4" variant="outline">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-300">
                No blogs available at the moment.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
