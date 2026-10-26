import { connection } from 'next/server';
import { getPublicProducts } from '@/lib/publicData';
import WomenCatalogClient from '@/components/catalog/WomenCatalogClient';

// Render with real DB data on the server so visitors don't see sample outfits first
export const instant = false;

export default async function WomenCatalogPage() {
  await connection();
  const products = await getPublicProducts();
  return <WomenCatalogClient initialProducts={products} />;
}
