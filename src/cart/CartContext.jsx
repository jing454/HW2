import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const cartStorageKey = 'restaurantCart';

function loadCart() {
  try {
    const savedCart = localStorage.getItem(cartStorageKey);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error loading cart:', error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => loadCart());
  const [toast, setToast] = useState(null);

  const showToast = message => {
    setToast(message);
  };

  const clearToast = () => {
    setToast(null);
  };

  useEffect(() => {
    try {
      localStorage.setItem(cartStorageKey, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [cartItems]);

  const addItem = (id, name, price) => {
    const numericPrice = Number(price);

    setCartItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === id);

      if (existingItem) {
        showToast(`${name} added to cart`);
        return currentItems.map(item => (
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      }

      showToast(`${name} added to cart`);
      return [...currentItems, { id, name, price: numericPrice, quantity: 1 }];
    });
  };

  const removeItem = id => {
    setCartItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.id === id);

      if (itemToRemove) {
        showToast(`${itemToRemove.name} removed from cart`);
      }

      return currentItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id, quantity) => {
    const nextQuantity = Number(quantity);

    if (nextQuantity <= 0) {
      removeItem(id);
      return;
    }

    setCartItems(currentItems => currentItems.map(item => (
      item.id === id ? { ...item, quantity: nextQuantity } : item
    )));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const itemCount = useMemo(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems],
  );

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );

  const value = {
    cartItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
    toast,
    clearToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
