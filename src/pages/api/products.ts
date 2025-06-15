import type { APIRoute } from 'astro';
import { getProducts } from '../../../src/data/products';

export const GET: APIRoute = async () => {
  const products = await getProducts();
  return new Response(JSON.stringify(products), { status: 200 });
};
