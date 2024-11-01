import React, { useState, useEffect } from 'react';
import api from './_utils/GlobalApi';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isLoginPage = router.asPath === '/login'; // Check if on the login page

    if (token && isLoginPage) {
      router.replace('/userdashboard'); // Redirect only if on the login page
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset any previous error message

    try {
      const response = await api.post('/auth/local', {
        identifier: email,
        password: password,
      });

      console.log('Login response:', response);

      if (response.status === 200) {
        const { jwt, user } = response.data;
        localStorage.setItem('token', jwt);
        console.log('Logged in user:', user);

        // Redirect to the intended destination after login
        if (typeof redirect === 'string') {
          router.replace(redirect); // Use replace here
        } else {
          router.replace('/userdashboard'); // Use replace here
        }
      }
    } catch (error: any) {
      console.error('Error during login:', error);
      if (error.response && error.response.status === 400) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('Login failed. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="flex flex-col items-center justify-center lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 text-center">
            <h1 className="title-font font-medium text-3xl text-gray-900">
              Welcome Back!
            </h1>
            <p className="leading-relaxed mt-4">
              Please log in to your account to continue.
            </p>
          </div>

          <div className="lg:w-2/6 md:w-1/2 rounded-lg p-8 bg-gray-100 flex border flex-col md:ml-auto w-full mt-10 md:mt-6">
            <h2 className="text-custom-dark text-3xl text-center font-medium title-font mb-5">
              Log In
            </h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 text-md">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <button
                type="submit"
                className={`mt-6 w-full flex items-center justify-center font-semibold py-2 px-4 rounded-lg border text-white transition-colors duration-300 ${loading ? 'bg-gray-400' : 'bg-custom-green'}`}
                disabled={loading}
              >
                Sign in
              </button>
            </form>
            <Link href="/forgot-password">
              <p className="text-md text-custom-blue underline py-4 cursor-pointer mt-3">
                Forgot your password?
              </p>
            </Link>
            <p className="text-md text-gray-500 font-bold mt-3">
              New Customer?{' '}
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
