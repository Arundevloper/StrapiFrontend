// components/UserIcon.js
import React from 'react';
import { useRouter } from 'next/router'; // Use useRouter for navigation
import AccountCircle from '@mui/icons-material/AccountCircle'; // User Profile Icon
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const UserIcon = () => {
  const router = useRouter(); // Get router object for navigation
  const { isAuthenticated } = useAuth(); // Get authentication status from context

  const handleProfileClick = () => {
    if (isAuthenticated) {
      router.push('/userdashboard'); // Navigate to user dashboard if authenticated
    } else {
      router.push('/login'); // Navigate to login if not authenticated
    }
  };

  return (
    <AccountCircle
      className="text-gray-600 cursor-pointer" // Add styling
      onClick={handleProfileClick} // Handle profile icon click
      fontSize="large" // You can change the size as needed
    />
  );
};

export default UserIcon;
