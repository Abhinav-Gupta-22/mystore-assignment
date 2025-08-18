// src/app/api/products/route.js
import { products } from '@/data/products';

export async function GET() {
  return new Response(JSON.stringify(products), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 's-maxage=300, stale-while-revalidate'
    }
  });
}