import React, { createContext, useState, useEffect, ReactNode, useMemo } from 'react';

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
  const [cart, setCart] = useState<CartItem[]>([]); // Start with an empty array
  const [isLoading, setIsLoading] = useState(true); // Loading state to manage hydration

  // Effect to load cart from local storage
  useEffect(() => {
    if (typeof window !== "undefined") { // Ensure we're in the browser
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        try {
          setCart(JSON.parse(storedCart));
        } catch (error) {
          console.error('Error parsing cart from localStorage:', error);
        }
      }
    }
    setIsLoading(false); // Set loading to false after trying to load cart
  }, []); // Run only once after component mounts

  // Effect to save cart to local storage whenever it changes
  useEffect(() => {
    if (!isLoading && typeof window !== "undefined") { // Ensure we're in the browser and not loading
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isLoading]);

  const addItem = (newItem: CartItem) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.productSlug === newItem.productSlug);
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        const existingItem = updatedCart[existingItemIndex];

        // Check if the requested quantity exceeds available stock
        if (existingItem.productQuantity + newItem.productQuantity > newItem.stock) {
          alert('Insufficient stock available');
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
        // Ensure the quantity doesn't exceed available stock and is not less than 1
        if (quantity <= updatedCart[itemIndex].stock && quantity > 0) {
          updatedCart[itemIndex].productQuantity = quantity;
        } else if (quantity > updatedCart[itemIndex].stock) {
          alert('Insufficient stock available');
        } else {
          // If quantity is zero or less, remove the item from the cart
          updatedCart.splice(itemIndex, 1);
        }
      }
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]); // Clears the cart state
  };

  const contextValue = useMemo(
    () => ({ cart, addItem, removeItem, updateQuantity, clearCart }),
    [cart]
  );

  // Render loading indicator if still loading
  if (isLoading) {
    return <div>Loading...</div>; // Replace with a more suitable loading component if needed
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart Context
export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
