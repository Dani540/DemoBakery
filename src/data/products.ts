import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PRODUCTS_PATH = path.join(__dirname, '../../products.json');

export async function getProducts() {
  const data = await fs.readFile(PRODUCTS_PATH, 'utf-8');
  return JSON.parse(data);
}

export async function saveProducts(products: any) {
  await fs.writeFile(PRODUCTS_PATH, JSON.stringify(products, null, 2));
}

export async function findProduct(id: string) {
  const products = await getProducts();
  return products.find((p: any) => p.id === id);
}

export async function addProduct(product: any) {
  const products = await getProducts();
  products.push(product);
  await saveProducts(products);
}

export async function updateProduct(id: string, update: any) {
  const products = await getProducts();
  const idx = products.findIndex((p: any) => p.id === id);
  if (idx !== -1) {
    products[idx] = { ...products[idx], ...update };
    await saveProducts(products);
    return true;
  }
  return false;
}
