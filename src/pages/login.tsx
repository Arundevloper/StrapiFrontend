"use client";

import React, { useState } from "react";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Link from "next/link";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-24 mx-auto   flex flex-wrap items-center">
          <div className="flex flex-col items-center justify-center lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 text-center">
            <h1 className="title-font font-medium text-3xl text-gray-900">
              Welcome Back!
            </h1>
            <p className="leading-relaxed mt-4">
              Please log in to your account to continue.
            </p>
          </div>

          <div className="lg:w-2/6 md:w-1/2 rounded-lg p-8 bg-gray-100 flex border flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-custom-dark text-3xl text-center font-medium title-font mb-5">
              Log In
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 text-md">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="password" className="leading-7 text-md">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <Link href="/forgot-password">
                <p className="text-md text-custom-blue underline py-4 cursor-pointer mt-3">
                  Forgot your password?
                </p>
              </Link>
              <button
                type="submit"
                className="mt-6 w-full flex items-center bg-custom-green justify-center font-semibold py-2 px-4 rounded-lg border border-custom-green text-white transition-colors duration-300"
              >
                Sign in
              </button>
            </form>

            <div className="flex items-center justify-between my-6">
              <div className="h-px w-full bg-gray-300"></div>
              <p className="px-4 text-gray-500">OR</p>
              <div className="h-px w-full bg-gray-300"></div>
            </div>

            <button className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4 hover:bg-gray-100 transition duration-300">
              <FaGoogle className="text-red-500 mr-2" />
              <span className="font-semibold text-gray-700">Continue with Google</span>
            </button>

            <button className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100 transition duration-300">
              <FaFacebookF className="text-blue-600 mr-2" />
              <span className="font-semibold text-gray-700">Continue with Facebook</span>
            </button>

            {/* <Link href="/register">
              <button className="mt-6 w-full flex items-center bg-white border-custom-blue justify-center font-semibold py-2 px-4 rounded-lg border text-custom-blue transition-colors duration-300">
                Register
              </button>
            </Link> */}
             <p className="text-md text-gray-500 font-bold mt-3">
             New Customer?{" "}
              <Link href="/register" className="text-custom-blue">
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;
