// components/Logout.js
import React from 'react';
import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/router'; // Import useRouter for navigation

const Logout = () => {
  const { logout } = useAuth(); // Get logout function and authentication status
  const router = useRouter(); // Get router object for navigation

  const handleLogout = () => {
    logout(); // Call logout function from context
    router.push('/login'); // Redirect to login page after logging out
  };



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
