import type { APIRoute } from 'astro';
import { getRatings, getRatingsForProduct, getRatingsForUser } from '../../../src/data/ratings';

export const GET: APIRoute = async ({ url }) => {
  const productId = url.searchParams.get('productId');
  const username = url.searchParams.get('username');
  if (productId) {
    const ratings = await getRatingsForProduct(productId);
    return new Response(JSON.stringify(ratings), { status: 200 });
  }
  if (username) {
    const ratings = await getRatingsForUser(username);
    return new Response(JSON.stringify(ratings), { status: 200 });
  }
  const ratings = await getRatings();
  return new Response(JSON.stringify(ratings), { status: 200 });
};
