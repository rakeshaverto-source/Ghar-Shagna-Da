import { Metadata } from 'next';
import { SITE_CONFIG } from '@/data/products';

export function constructMetadata({
  title = `${SITE_CONFIG.name} | Luxury Bridal Lehengas & Sherwanis on Rent`,
  description = SITE_CONFIG.description,
  image = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop',
  canonical = SITE_CONFIG.domain,
  noIndex = false,
  keywords = [
    'bridal lehenga on rent',
    'sherwani rental',
    'wedding dresses on rent',
    'Ghar Shagna Da',
    'punjabi bridal rental',
    'anand karaj wedding dress',
    'designer lehenga hire',
    'groom wear on rent',
    'rent wedding dress in punjab'
  ]
}: {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
  keywords?: string[];
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description,
    keywords: keywords.join(', '),
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    metadataBase: new URL(SITE_CONFIG.domain),
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_CONFIG.name,
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@gharshagnada',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
