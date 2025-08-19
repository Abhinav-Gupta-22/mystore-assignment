'use client';

import React, { useContext, useState, useEffect, useCallback } from 'react';
import { CartContext } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const router = useRouter();

  // Handle image source with multiple fallbacks
  const getImageSource = () => {
    // Return placeholder if no image is available
    if (!product) return null;
    if (product.image?.startsWith('http') || product.image?.startsWith('/')) return product.image;
    if (product.imageUrl?.startsWith('http') || product.imageUrl?.startsWith('/')) return product.imageUrl;
    return null;
  };

  const [imgSrc, setImgSrc] = useState(null);
  const [imgError, setImgError] = useState(true);

  // Initialize image source and error state
  useEffect(() => {
    const source = getImageSource();
    setImgSrc(source);
    setImgError(!source);
  }, [product]);

  const handleImageError = useCallback((e) => {
    console.error('Failed to load image:', e.target.src);
    setImgError(true);
    setImgSrc(null);
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col h-full">
      {/* Product Image */}
      <div className="relative h-48 w-full bg-gray-50 flex items-center justify-center overflow-hidden">
        {imgError || !imgSrc ? (
          <div className="flex flex-col items-center justify-center p-4 w-full h-full">
            <div className="w-16 h-16 mb-2 text-gray-200">
              <svg 
                className="w-full h-full"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-sm text-center text-gray-400">{product?.name || 'Product'}</span>
            <span className="text-xs text-gray-400 mt-1">No image available</span>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={imgSrc}
              alt={product?.name || 'Product'}
              fill
              className="object-contain w-full h-full p-2"
              onError={handleImageError}
              unoptimized={process.env.NODE_ENV !== 'production'}
              priority={false}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        {product.description && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
        )}
        <p className="text-gray-900 font-bold mb-4">
          ${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
        </p>
        
        {/* Action Buttons */}
        <div className="mt-auto flex gap-2">
          <button
            className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded hover:bg-gray-200 transition"
            onClick={() => router.push(`/products/${product.id}`)}
          >
            View Details
          </button>
          <button
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            onClick={() => addToCart(product, 'Default', 'One Size')}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
