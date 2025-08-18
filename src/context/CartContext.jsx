// src/context/CartContext.jsx
'use client';

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getCart, saveCart } from '@/utils/storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize cart from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = getCart();
      setCartItems(savedCart);
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      saveCart(cartItems);
    }
  }, [cartItems, isInitialized]);

  // Add item to cart or update quantity if it exists
  const addToCart = useCallback((product, selectedColor = 'Default', selectedSize = 'One Size') => {
    setCartItems(prevItems => {
      // Create a new array to avoid mutating the previous state
      const items = [...prevItems];
      const existingItemIndex = items.findIndex(
        item => 
          item.productId === product.id && 
          item.color === selectedColor && 
          item.size === selectedSize
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItem = {
          ...items[existingItemIndex],
          quantity: items[existingItemIndex].quantity + 1,
          lastUpdated: new Date().toISOString()
        };
        items[existingItemIndex] = updatedItem;
      } else {
        // Add new item
        items.push({
          id: `${product.id}-${selectedColor}-${selectedSize}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          color: selectedColor,
          size: selectedSize,
          quantity: 1,
          imageUrl: product.image || product.imageUrl || '/placeholder-product.jpg',
          addedAt: new Date().toISOString()
        });
      }

      return items;
    });
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  }, []);

  // Get total number of items in cart
  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  // Get total price of items in cart
  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  }, [cartItems]);

  // Clear the cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return (
    <CartContext.Provider
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        updateQuantity, 
        getTotalItems, 
        getTotalPrice 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
