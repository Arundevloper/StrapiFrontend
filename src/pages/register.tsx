"use client";

import React, { useState } from "react";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Link from "next/link";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-24 mx-auto flex flex-wrap   items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 flex flex-col items-center">
            <h1 className="title-font font-medium text-3xl text-gray-900 text-center">
              Create an Account
            </h1>
            <p className="leading-relaxed mt-4 text-center">
              Please fill in the details to register.
            </p>
          </div>

          <div className="lg:w-2/6 md:w-1/2 rounded-lg border bg-gray-100  p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-custom-dark text-3xl text-center font-medium title-font mb-5">
              Register
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <label htmlFor="firstName" className="leading-7 text-md">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="lastName" className="leading-7 text-md">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
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
              <button
                type="submit"
                className="mt-6 w-full flex items-center bg-custom-green justify-center font-semibold py-2 px-4 rounded-lg border border-custom-green text-white transition-colors duration-300"
              >
                Sign Up
              </button>
            </form>

            <div className="flex items-center justify-between my-6">
              <div className="h-px w-full bg-gray-300"></div>
              <p className="px-4 text-gray-500">OR</p>
              <div className="h-px w-full bg-gray-300"></div>
            </div>

            <button className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4 hover:bg-gray-100 transition duration-300">
              <FaGoogle className="text-red-500 mr-2" />
              <span className="font-semibold text-gray-700">Sign up with Google</span>
            </button>

            <button className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100 transition duration-300">
              <FaFacebookF className="text-blue-600 mr-2" />
              <span className="font-semibold text-gray-700">Sign up with Facebook</span>
            </button>

            <p className="text-md text-gray-500 font-bold mt-3">
           Already have account?{" "}
              <Link href="/login" className="text-custom-blue">
              Login  
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Register;
