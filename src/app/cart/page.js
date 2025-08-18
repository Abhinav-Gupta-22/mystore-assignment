'use client';

import React, { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useContext(CartContext);

  const handleQuantityChange = (itemId, newQuantity) => {
    const quantity = Math.max(1, parseInt(newQuantity) || 1);
    updateQuantity(itemId, quantity);
  };

  const handleCheckout = () => {
    alert('Checkout functionality will be implemented here');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <p className="text-gray-600 mb-4">Your cart is empty</p>
        <Link 
          href="/products" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <div className="grid grid-cols-12 gap-4 font-medium text-gray-600">
            <div className="col-span-5">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>
        </div>

        {cartItems.map((item) => {
          const itemId = item.id || `${item.productId}-${item.color}-${item.size}`;
          return (
            <div key={itemId} className="p-4 border-b">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-5 flex items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden mr-4 relative">
                    <Image 
                      src={item.imageUrl || '/placeholder-product.jpg'} 
                      alt={item.name} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    {item.color && item.size && (
                      <p className="text-sm text-gray-500">
                        {item.color} | {item.size}
                      </p>
                    )}
                    <button 
                      onClick={() => removeFromCart(itemId)}
                      className="text-red-500 text-sm mt-1 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                
                <div className="col-span-2 text-center">
                  ${parseFloat(item.price).toFixed(2)}
                </div>
                
                <div className="col-span-3">
                  <div className="flex items-center justify-center">
                    <button 
                      onClick={() => handleQuantityChange(itemId, item.quantity - 1)}
                      className="w-8 h-8 border rounded-l hover:bg-gray-100 flex items-center justify-center"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(itemId, e.target.value)}
                      className="w-12 h-8 border-t border-b text-center"
                    />
                    <button 
                      onClick={() => handleQuantityChange(itemId, item.quantity + 1)}
                      className="w-8 h-8 border rounded-r hover:bg-gray-100 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="col-span-2 text-right font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          );
        })}

        <div className="p-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <Link 
              href="/products" 
              className="text-blue-600 hover:underline"
            >
              Continue Shopping
            </Link>
            <div className="text-lg font-semibold">
              Total: ${getTotalPrice()}
            </div>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}