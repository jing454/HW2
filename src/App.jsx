import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CartProvider } from './cart/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import { useCart } from './cart/CartContext';

function Toast() {
  const { toast, clearToast } = useCart();

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      clearToast();
    }, 2200);

    return () => window.clearTimeout(timeoutId);
  }, [toast, clearToast]);

  if (!toast) {
    return null;
  }

  return (
    <div className="cart-notification show" role="status" aria-live="polite">
      {toast}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Toast />
        <Routes>
          <Route path="/" element={<Navigate to="/Home" replace />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Menu" element={<MenuPage />} />
          <Route path="/Gallery" element={<GalleryPage />} />
          <Route path="/Contact" element={<ContactPage />} />
          <Route path="/Cart" element={<CartPage />} />
          <Route path="*" element={<Navigate to="/Home" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
