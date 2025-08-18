'use client';

import { useState, useMemo, useCallback, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductDetails from '@/components/ProductDetails';
import RecentlyViewed from '@/components/RecentlyViewed';
import { CartContext } from '@/context/CartContext';
import { toast } from 'react-toastify';

export default function ProductDetailsWrapper({ product }) {
  const router = useRouter();
  const { addToCart } = useContext(CartContext);

  // Set initial color to the first available color if not set
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Set default color on initial render
  useEffect(() => {
    if (product?.variants?.length > 0 && !selectedColor) {
      setSelectedColor(product.variants[0].color);
    }
  }, [product, selectedColor]);

  // Calculate available sizes for the selected color
  const availableSizesForColor = useMemo(() => {
    if (!selectedColor) return [];
    const variant = product.variants.find(v => v.color === selectedColor);
    return variant?.sizes || [];
  }, [selectedColor, product.variants]);

  // Reset size when color changes
  useEffect(() => {
    setSelectedSize('');
  }, [selectedColor]);

  // Handle color selection
  const handleColorSelect = useCallback((color) => {
    setSelectedColor(color);
  }, []);

  // Handle size selection
  const handleSizeSelect = useCallback((size) => {
    setSelectedSize(size);
  }, []);

  // Handle add to cart with validation and feedback
  const handleAddToCart = useCallback(async () => {
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }
    
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    try {
      setIsAddingToCart(true);
      await addToCart({
        ...product,
        selectedColor,
        selectedSize,
      });
      
      toast.success('Added to cart successfully!');
      
      // Reset form
      setSelectedSize('');
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  }, [selectedColor, selectedSize, product, addToCart]);

  // Handle product not found
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetails
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        onColorSelect={handleColorSelect}
        onSizeSelect={handleSizeSelect}
        onAddToCart={handleAddToCart}
        availableSizesForColor={availableSizesForColor}
        isAddingToCart={isAddingToCart}
      />
      <RecentlyViewed currentProductId={product.id} />
    </div>
  );
}
