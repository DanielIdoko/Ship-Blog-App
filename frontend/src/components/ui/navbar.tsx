"use client";
import React from "react";
import {
  ClerkProvider,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import { useTheme } from "../../../contexts/ThemeContext";
import Link from "next/link";
import { FiMoon, FiSun } from "react-icons/fi";
import { cn } from "../../lib/utils";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <Link href="/" className="font-bold text-medium flex-1 text-dark logo">
        Bolga
      </Link>

      {/* if user is signed in show profile button */}
      <div className="w-fit h-fit mr-6 md:mr-20">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <div className="flex gap-3">
            <SignInButton withSignUp mode="redirect">
              <button
                className="px-4 py-2 rounded-2xl border text-small border-gray-300 dark:border-gray-700 
                   text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 
                   transition-colors cursor-pointer"
              >
                Login
              </button>
            </SignInButton>

            <SignUpButton mode="redirect">
              <button
                className="px-4 py-2 rounded-2xl bg-primary text-small text-white 
                   hover:opacity-90 transition-opacity cursor-pointer shadow-sm dark:shadow-none"
              >
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </SignedOut>
      </div>

      <div className="w-fit h-full">
        <button
          className="cursor-pointer hover:bg-primary/10 p-1 rounded-full transition duration-300 ease-in"
          onClick={toggleTheme}
          style={{
            color: theme === "light" ? "#121212" : "#fff",
          }}
        >
          {theme === "light" ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
