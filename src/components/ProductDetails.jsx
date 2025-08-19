// components/ProductDetails.js
'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

const ProductDetails = ({
  product,
  selectedColor,
  selectedSize,
  onColorSelect,
  onSizeSelect,
  onAddToCart,
  availableSizesForColor = [],
}) => {
  // Find the selected variant for additional info
  const selectedVariant = useMemo(() => {
    if (!product?.variants?.length) return null;
    return product.variants.find(v => v.color === selectedColor) || product.variants[0];
  }, [product?.variants, selectedColor]);

  // Format price to 2 decimal places
  const formattedPrice = useMemo(() => {
    return product?.price ? Number(product.price).toFixed(2) : '0.00';
  }, [product?.price]);
  
  // Image state management
  const [currentImage, setCurrentImage] = useState('');
  const [imageError, setImageError] = useState(false);

  // Update image source when product or selected color changes
  useEffect(() => {
    if (!product) {
      setCurrentImage('');
      setImageError(true);
      return;
    }

    let imageSource = '';
    
    // Try to get image from selected variant
    if (selectedVariant?.image) {
      imageSource = selectedVariant.image;
    } 
    // Fall back to product image
    else if (product.image) {
      imageSource = product.image;
    }
    
    // If we have a valid image source, try to load it
    if (imageSource) {
      const img = new Image();
      img.src = imageSource;
      
      img.onload = () => {
        setCurrentImage(imageSource);
        setImageError(false);
      };
      
      img.onerror = () => {
        console.error('Failed to load image:', imageSource);
        setCurrentImage('');
        setImageError(true);
      };
    } else {
      setCurrentImage('');
      setImageError(true);
    }
  }, [product, selectedVariant]);

  // Handle image error from Next.js Image component
  const handleImageError = useCallback((e) => {
    console.error('Image load error:', e);
    setImageError(true);
    setCurrentImage('');
  }, []);

  // Handle color selection
  const handleColorSelect = (color) => {
    onColorSelect(color);
    // Reset size when color changes
    onSizeSelect('');
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Product Image */}
      <div className="md:w-1/2 flex justify-center items-center bg-gray-50 rounded-lg overflow-hidden shadow-sm relative h-96">
        <div className="relative w-full h-full">
          {!imageError && currentImage ? (
            <Image
              src={currentImage}
              alt={product?.name || 'Product image'}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
              onError={handleImageError}
              unoptimized={process.env.NODE_ENV !== 'production'}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
              <div className="w-24 h-24 text-gray-300 mb-4">
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
              <span className="text-gray-400 text-sm">
                {product?.name || 'No image available'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-900">
          {product.name}
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          {product.description}
        </p>
        <p className="text-5xl font-bold text-blue-600">${formattedPrice}</p>

        {/* Color Selector */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Color: {selectedColor || 'Select a color'}
          </h2>
          <div className="flex gap-3" role="radiogroup" aria-label="Select color">
            {product.variants.map((variant) => (
              <button
                key={variant.color}
                type="button"
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  selectedColor === variant.color
                    ? 'border-blue-500 ring-2 ring-blue-300'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
                style={{ backgroundColor: variant.color.toLowerCase() }}
                onClick={() => handleColorSelect(variant.color)}
                title={variant.color}
                aria-label={`Color ${variant.color}`}
                aria-checked={selectedColor === variant.color}
                role="radio"
              ></button>
            ))}
          </div>
        </div>

        {/* Size Selector */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Size: {selectedSize || 'Select a size'}
          </h2>
          <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Select size">
            {availableSizesForColor.length > 0 ? (
              availableSizesForColor.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`px-5 py-2 rounded-lg border-2 font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    selectedSize === size
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                  onClick={() => onSizeSelect(size)}
                  aria-label={`Size ${size}`}
                  aria-checked={selectedSize === size}
                  role="radio"
                >
                  {size}
                </button>
              ))
            ) : (
              <p className="text-gray-500">Please select a color first</p>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={onAddToCart}
          disabled={!selectedColor || !selectedSize}
          className={`w-full py-4 text-xl font-bold rounded-lg shadow-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            selectedColor && selectedSize
              ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {selectedColor && selectedSize ? 'Add to Cart' : 'Select color and size'}
        </button>
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string.isRequired,
        sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
        image: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
  selectedColor: PropTypes.string,
  selectedSize: PropTypes.string,
  onColorSelect: PropTypes.func.isRequired,
  onSizeSelect: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  availableSizesForColor: PropTypes.arrayOf(PropTypes.string),
};

export default ProductDetails;
