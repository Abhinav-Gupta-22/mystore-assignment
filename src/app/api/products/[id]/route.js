import { products } from '@/data/products';

export async function GET(request, { params }) {
  try {
    const product = products.find(p => p.id === params.id || p.id === parseInt(params.id));
    
    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify(product), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=300, stale-while-revalidate'
      }
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
