import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USERS_PATH = path.join(__dirname, '../../users.json');

export async function getUsers() {
  const data = await fs.readFile(USERS_PATH, 'utf-8');
  return JSON.parse(data);
}

export async function saveUsers(users: any) {
  await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));
}

export async function findUser(username: string) {
  const users = await getUsers();
  return users.find((u: any) => u.username === username);
}

export async function addUser(user: any) {
  const users = await getUsers();
  users.push(user);
  await saveUsers(users);
}

export async function updateUser(username: string, update: any) {
  const users = await getUsers();
  const idx = users.findIndex((u: any) => u.username === username);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...update };
    await saveUsers(users);
    return true;
  }
  return false;
}
