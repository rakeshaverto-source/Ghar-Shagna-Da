import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/data/products';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: "Rental Catalog | Bridal Lehengas, Sherwanis & Wedding Dresses | Ghar Shagna Da",
  description: "Browse the full Ghar Shagna Da rental catalog: designer bridal lehengas, wedding dresses and groom sherwanis in Zirakpur, Punjab with custom fitting.",
  canonical: `${SITE_CONFIG.domain}/catalog`,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
