import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RATINGS_PATH = path.join(__dirname, '../../ratings.json');

export async function getRatings() {
  const data = await fs.readFile(RATINGS_PATH, 'utf-8');
  return JSON.parse(data);
}

export async function saveRatings(ratings: any) {
  await fs.writeFile(RATINGS_PATH, JSON.stringify(ratings, null, 2));
}

export async function findRating(username: string, productId: string) {
  const ratings = await getRatings();
  return ratings.find((r: any) => r.username === username && r.productId === productId);
}

export async function addOrUpdateRating(username: string, productId: string, value: number) {
  const ratings = await getRatings();
  const idx = ratings.findIndex((r: any) => r.username === username && r.productId === productId);
  if (idx !== -1) {
    ratings[idx].value = value;
  } else {
    ratings.push({ username, productId, value });
  }
  await saveRatings(ratings);
}

export async function getRatingsForProduct(productId: string) {
  const ratings = await getRatings();
  return ratings.filter((r: any) => r.productId === productId);
}

export async function getRatingsForUser(username: string) {
  const ratings = await getRatings();
  return ratings.filter((r: any) => r.username === username);
}
