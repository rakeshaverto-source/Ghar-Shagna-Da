import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/data/products';
import { constructMetadata, OG_IMAGES } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: "Groom Sherwanis & Indo-Western Wear on Rent | Ghar Shagna Da",
  description: "Rent royal groom sherwanis, bandhgala and indo-western achkans at Ghar Shagna Da, Zirakpur. Custom fitting and hygienic packaging.",
  canonical: `${SITE_CONFIG.domain}/men`,
  image: OG_IMAGES.groom,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
