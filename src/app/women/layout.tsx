import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/data/products';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: "Women's Bridal Lehengas & Wedding Dresses on Rent | Ghar Shagna Da",
  description: "Rent designer bridal lehengas, Anand Karaj outfits, reception gowns and haldi sharara sets for women at Ghar Shagna Da, Zirakpur.",
  canonical: `${SITE_CONFIG.domain}/women`,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
