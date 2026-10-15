import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/data/products';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: "Wedding Gallery | Real Brides & Grooms | Ghar Shagna Da",
  description: "See real brides and grooms wearing Ghar Shagna Da rental lehengas and sherwanis at weddings across Punjab and Chandigarh.",
  canonical: `${SITE_CONFIG.domain}/gallery`,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
