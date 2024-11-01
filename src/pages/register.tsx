import React, { useState } from "react";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Link from "next/link";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import api from "./_utils/GlobalApi"; // Adjust the import path based on your project structure
import { User } from "./_utils/types/User"; // Import your User interface

const Register: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null); // State for success message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null); // Reset success message

    // Validate password length
    if (password.length < 6) {
        setError("Password must be at least 6 characters long."); // Set error message for password length
        setLoading(false);
        return; // Stop the submission process
    }

    const userData: User = { username: userName, email, password }; // Create user object

    try {
        const response = await api.post('/auth/local/register', userData); // Send POST request to Strapi
        setSuccess("Registration successful! Please log in."); // Set success message
        console.log('User registered:', response.data); // Log response data or handle as needed
    } catch (error: any) {
        // Handle error based on the Strapi error structure
        const errorMessage = error.response?.data?.error?.message || 'Registration failed';

        if (errorMessage === "Email or Username are already taken") {
            setError('Email or username is already taken. Please choose different ones.');
        } else {
            setError(errorMessage); // Set the default error message if it's something else
        }

        console.error('Registration error:', error);
    } finally {
        setLoading(false);
    }
};

  

  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 flex flex-col items-center">
            <h1 className="title-font font-medium text-3xl text-gray-900 text-center">
              Create an Account
            </h1>
            <p className="leading-relaxed mt-4 text-center">
              Please fill in the details to register.
            </p>
          </div>

          <div className="lg:w-2/6 md:w-1/2 rounded-lg border bg-gray-100 p-8 flex flex-col md:ml-auto w-full mt-12 md:mt-6">
            <h2 className="text-custom-dark text-3xl text-center font-medium title-font mb-5">
              Register
            </h2>
            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
            {success && <p className="text-green-500">{success}</p>} {/* Display success message */}
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <label htmlFor="lastName" className="leading-7 text-md">
                  Username
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
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
                disabled={loading} // Disable button while loading
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
{/* 
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
            </button> */}

            <p className="text-md text-gray-500 font-bold mt-3">
              Already have an account?{" "}
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
