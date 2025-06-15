import type { APIRoute } from 'astro';
import { findUser } from '../../../src/data/users';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const { username } = await request.json();
  if (!username) {
    return new Response(JSON.stringify({ error: 'Falta el usuario' }), { status: 400 });
  }
  const user = await findUser(username);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 404 });
  }
  return new Response(JSON.stringify({ user }), { status: 200 });
};
