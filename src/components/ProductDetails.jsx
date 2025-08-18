// components/ProductDetails.js
import React from 'react';
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
  const selectedVariant = product.variants.find(
    (v) => v.color === selectedColor,
  );

  // Format price to 2 decimal places
  const formattedPrice = product.price.toFixed(2);

  // Handle color selection
  const handleColorSelect = (color) => {
    onColorSelect(color);
    // Reset size when color changes
    onSizeSelect('');
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Product Image */}
      <div className="md:w-1/2 flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden shadow-md">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-auto object-cover"
          loading="lazy"
        />
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
                style={{ backgroundColor: variant.hex }}
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
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string.isRequired,
        hex: PropTypes.string.isRequired,
        sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
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
