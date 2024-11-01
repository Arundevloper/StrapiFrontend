// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
        <ToastContainer /> {/* Add ToastContainer here */}
      </CartProvider>
    </AuthProvider>
  );
}
