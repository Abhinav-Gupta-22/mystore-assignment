'use client';

import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';

export default function ProductsPage() {
  const { products, isLoading, isError } = useProducts();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
