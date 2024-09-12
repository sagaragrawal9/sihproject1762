import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setCartItems(parsedUser.cart || []);
    }
  }, []);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.find((i) => i.id === item.id)
        ? prevItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...prevItems, { ...item, quantity: 1 }];
      updateUserCart(newItems);
      return newItems;
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== id);
      updateUserCart(newItems);
      return newItems;
    });
  };

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) => {
      const newItems = prevItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0);
      updateUserCart(newItems);
      return newItems;
    });
  };

  const updateUserCart = (newItems) => {
    if (user) {
      const updatedUser = { ...user, cart: newItems };
      setUser(updatedUser);
      
      // Update user in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map(u => u.email === user.email ? updatedUser : u);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Update current user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const login = (userData) => {
    setUser(userData);
    setCartItems(userData.cart || []);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setCartItems([]);
    localStorage.removeItem('currentUser');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        user,
        login,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);