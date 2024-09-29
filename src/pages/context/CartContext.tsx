import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Defining the Cart Item Interface
interface CartItem {
  productSlug: string;
  productName: string;
  productQuantity: number;
  price: number;
  discount: number;
  stock: number;
  productImage: string; // New field for product image URL
}

// Defining the Cart Context Properties
interface CartContextProps {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productSlug: string) => void;
  updateQuantity: (productSlug: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

// Cart Provider Component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart from localStorage if it exists
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (newItem: CartItem) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.productSlug === newItem.productSlug);
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        const existingItem = updatedCart[existingItemIndex];

        // Check if the requested quantity exceeds available stock
        if (existingItem.productQuantity + newItem.productQuantity > newItem.stock) {
          return updatedCart; // or handle a notification for insufficient stock
        }

        existingItem.productQuantity += newItem.productQuantity;
        return updatedCart;
      } else {
        return [...prevCart, newItem];
      }
    });
  };

  const removeItem = (productSlug: string) => {
    setCart(prevCart => prevCart.filter(item => item.productSlug !== productSlug));
  };

  const updateQuantity = (productSlug: string, quantity: number) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      const itemIndex = updatedCart.findIndex(item => item.productSlug === productSlug);
      if (itemIndex !== -1) {
        // Ensure the quantity doesn't exceed available stock
        if (quantity <= updatedCart[itemIndex].stock) {
          updatedCart[itemIndex].productQuantity = quantity;
        }
      }
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
