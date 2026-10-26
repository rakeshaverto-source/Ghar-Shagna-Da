import { connection } from 'next/server';
import { getPublicProducts } from '@/lib/publicData';
import CatalogClient from '@/components/catalog/CatalogClient';

// Render with real DB data on the server so visitors don't see sample outfits first
export const instant = false;

export default async function CatalogPage() {
  await connection();
  const products = await getPublicProducts();
  return <CatalogClient initialProducts={products} />;
}
