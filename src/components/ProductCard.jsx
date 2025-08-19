'use client';

import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const router = useRouter();

  // Handle image error with fallback to placeholder
  const [imgSrc, setImgSrc] = useState(
    product.image || product.imageUrl || '/images/placeholder-product.jpg'
  );
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    if (!imgError) {
      setImgSrc('/images/placeholder-product.jpg');
      setImgError(true);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col h-full">
      <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center">
        {imgError ? (
          <div className="text-center p-4 text-gray-500">
            <svg
              className="w-12 h-12 mx-auto mb-2 text-gray-400"
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
            <span className="text-sm">{product.name}</span>
          </div>
        ) : (
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
            onError={handleImageError}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PC9zdmc+"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <p className="text-gray-900 font-bold mb-4">${product.price}</p>
        <div className="flex gap-2">
          {/* View Product */}
          <button
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
            onClick={() => router.push(`/products/${product.id}`)}
          >
            View Product
          </button>

          {/* Add to Cart */}
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
