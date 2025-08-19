import { fetchProductById } from '@/data/products';
import { notFound } from 'next/navigation';
import ProductDetailsWrapper from './ProductDetailsWrapper';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }) {
  const { id } = params;
  let product = null;
  
  try {
    // Fetch product on the server for initial render
    product = await fetchProductById(id);
    
    if (!product) {
      notFound();
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <ProductDetailsWrapper initialProduct={product} />
      </div>
    </div>
  );
}
