// components/Logout.js
import React from 'react';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import { useRouter } from 'next/router'; // Import useRouter for navigation

const Logout = () => {
  const { logout, isAuthenticated } = useAuth(); // Get logout function and authentication status
  const router = useRouter(); // Get router object for navigation

  const handleLogout = () => {
    logout(); // Call logout function from context
    router.push('/login'); // Redirect to login page after logging out
  };

  if (!isAuthenticated) return null; // Render nothing if the user is not authenticated

  return (
    <button 
      onClick={handleLogout} // Handle logout click
      className="text-red-600 hover:underline cursor-pointer" // Styling for text
    >
      Logout
    </button>
  );
};

export default Logout;
