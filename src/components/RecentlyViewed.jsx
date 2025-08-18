'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getRecentlyViewed } from '@/utils/storage';

const RecentlyViewed = ({ currentProductId }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    // Don't run on server-side
    if (typeof window === 'undefined') return;
    
    // Get recently viewed products from localStorage
    const items = getRecentlyViewed();
    
    // Filter out current product and limit to 3 items
    const filteredItems = items
      .filter(item => item.id !== currentProductId)
      .slice(0, 3);
    
    setRecentlyViewed(filteredItems);
  }, [currentProductId]);

  if (recentlyViewed.length === 0) {
    return null; // Don't render if no recently viewed products
  }

  return (
    <section className="mt-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recently Viewed</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentlyViewed.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group block rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
              aria-label={`View ${product.name} details`}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-blue-600 font-bold">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
