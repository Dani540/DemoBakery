import type { APIRoute } from 'astro';
import { getUsers, addUser, findUser } from '../../../src/data/users';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const { username, password, ...rest } = await request.json();
  if (!username || !password) {
    return new Response(JSON.stringify({ error: 'Usuario y contraseña requeridos' }), { status: 400 });
  }
  const exists = await findUser(username);
  if (exists) {
    return new Response(JSON.stringify({ error: 'El usuario ya existe' }), { status: 409 });
  }
  await addUser({ username, password, ...rest, ratings: {} });
  return new Response(JSON.stringify({ success: true }), { status: 201 });
};
