// src/hooks/useProducts.js
'use client';

import useSWR from 'swr';

const API_URL = '/api/products';

// Custom fetcher with error handling
const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export function useProducts() {
  const { data, error, isLoading } = useSWR(API_URL, fetcher, {
    // Revalidate options
    revalidateOnFocus: false, // Don't revalidate on window focus
    revalidateOnReconnect: true,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 5 * 60 * 1000, // Revalidate every 5 minutes
    
    // Error retry logic
    errorRetryCount: 3,
    errorRetryInterval: 5000,
    
    // Cache handling
    dedupingInterval: 1000 * 60 * 5, // 5 minutes
    focusThrottleInterval: 1000 * 60 * 5, // 5 minutes
  });

  // Return the SWR response directly
  return {
    products: data || [],
    isLoading: isLoading,
    isError: error,
    error: error?.message,
  };
}

// Single product fetcher with cache revalidation
export function useProduct(id) {
  const { data, error, isLoading } = useSWR(
    id ? `/api/products/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 5, // 5 minutes
    }
  );

  return {
    product: data,
    isLoading,
    isError: error,
    error: error?.message,
  };
}