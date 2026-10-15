import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/data/products';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: "Admin | Ghar Shagna Da",
  description: "Private admin panel.",
  canonical: `${SITE_CONFIG.domain}/admin`,
  noIndex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
