import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface UserDetailsProps {
  name: string;
  email: string;
  role: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ name, email, role }) => {
  return (
    <Card className="mb-4">
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography color="textSecondary">{email}</Typography>
        <Typography color="textSecondary">{role}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserDetails;
