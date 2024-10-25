"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./theme-btn";
import LoadingBar from "react-top-loading-bar";
import { usePathname } from "next/navigation";
import useAuth from "@/app/hooks/Useauth"; // Import the useAuth hook

const Navbar = () => {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const { user, loading, logout } = useAuth(); // Use the useAuth hook to get user info

  useEffect(() => {
    setProgress(20);

    setTimeout(() => {
      setProgress(40);
    }, 100);

    setTimeout(() => {
      setProgress(100);
    }, 400);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => {
      setProgress(0);
    }, 50);
  }, []);

  if (loading) return <div>Loading...</div>; // Optional loading state

  return (
    <nav className="p-4 bg-background/50 sticky top-0 backdrop-blur border-b z-10">
      <LoadingBar
        color="#933ce6"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <div className="text-2xl font-bold">Blogarithms</div>
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
        <Link
                href="/"
                className="hover:scale-105 hover:font-semibold transition-transform duration-300"
              >
                Home
              </Link>
          {/* Conditionally render buttons based on user authentication */}
          {user ? (
            <>
              <Link
                href="/blog"
                className="hover:scale-105 hover:font-semibold transition-transform duration-300"
              >
                Blog
              </Link>
              <Link
                href="/form"
                className="hover:scale-105 hover:font-semibold transition-transform duration-300"
              >
                Write & Share
              </Link>
              <Link
                href="/dashboard"
                className="hover:scale-105 hover:font-semibold transition-transform duration-300"
              >
                Dashboard
              </Link>
              <Button
                onClick={logout}
                className="hover:scale-105 hover:font-semibold transition-transform duration-300"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="hover:scale-105 hover:font-semibold transition-transform duration-300"
              >
                Signup
              </Link>
              <Link
                href="/login"
                className="hover:scale-105 hover:font-semibold transition-transform duration-300"
              >
                Login
              </Link>
            </>
          )}
          <div className="flex items-center">
            <ModeToggle />
          </div>
        </div>

        <div className="md:hidden">
          <span className="mx-2">
            <ModeToggle />
          </span>
          <Sheet>
            <SheetTrigger>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="font-bold my-4">Blogarithms</SheetTitle>
                <SheetDescription>
                  <div className="flex flex-col gap-6">
                  <Link href="/"> Home</Link>
                    {/* Conditionally render buttons based on user authentication */}
                    {user ? (
                      <>
                        <Link href="/blog">Blog</Link>
                        <Link href="/form">Write & Share</Link>
                        <Link href="/dashboard">Dashboard</Link>
                        <Button onClick={logout}>Logout</Button>
                      </>
                    ) : (
                      <>
                        <Link href="/register">Signup</Link>
                        <Link href="/login">Login</Link>
                      </>
                    )}
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
