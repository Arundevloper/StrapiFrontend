// components/Cart.tsx
import React from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface CartProps {
  itemCount: number;
}

const CartComponent: React.FC<CartProps> = ({ itemCount }) => {
  return (
    <Badge badgeContent={itemCount} color="secondary">
      <ShoppingCartIcon  className="text-gray-600" />
    </Badge>
  );
};

export default CartComponent;
