import type { APIRoute } from 'astro';
import { addOrUpdateRating } from '../../../src/data/ratings';
import { findUser } from '../../../src/data/users';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Body vacío o JSON malformado' }), { status: 400 });
  }
  const { username, productId, value } = body || {};
  if (!username || !productId || typeof value !== 'number') {
    return new Response(JSON.stringify({ error: 'Datos incompletos' }), { status: 400 });
  }
  const user = await findUser(username);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 401 });
  }
  await addOrUpdateRating(username, productId, value);
  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
