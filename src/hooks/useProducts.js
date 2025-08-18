// src/hooks/useProducts.js
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export function useProducts() {
  const { data, error, isLoading } = useSWR('/api/products', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 5 * 60 * 1000, // 5 minutes
  });

  return {
    products: data,
    isLoading,
    isError: error
  };
}