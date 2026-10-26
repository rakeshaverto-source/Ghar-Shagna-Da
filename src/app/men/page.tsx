import { connection } from 'next/server';
import { getPublicProducts } from '@/lib/publicData';
import MenCatalogClient from '@/components/catalog/MenCatalogClient';

// Render with real DB data on the server so visitors don't see sample outfits first
export const instant = false;

export default async function MenCatalogPage() {
  await connection();
  const products = await getPublicProducts();
  return <MenCatalogClient initialProducts={products} />;
}
