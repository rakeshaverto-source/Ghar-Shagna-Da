import { Metadata } from 'next';
import { SITE_CONFIG } from '@/data/products';

// 1200x630 share images in public/og (kept small so WhatsApp shows the preview)
export const OG_IMAGES = {
  default: '/og/bride.jpg',
  logo: '/og/logo.jpg',
  groom: '/og/groom.jpg',
  blog: '/og/blog.jpg',
} as const;

// Social share image URL. Cloudinary uploads can be several MB, which WhatsApp and
// Facebook skip, so they're served resized to at most 1200px as a compressed JPEG.
export function ogImageUrl(src: string) {
  return src.replace(
    /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(?!c_limit)/,
    '$1c_limit,w_1200,h_1200,f_jpg,q_auto/'
  );
}

export function constructMetadata({
  title = `${SITE_CONFIG.name} | Luxury Bridal Lehengas & Sherwanis on Rent`,
  description = SITE_CONFIG.description,
  image = OG_IMAGES.default,
  canonical = './',
  noIndex = false,
  type = 'website',
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
  type?: 'website' | 'article';
  keywords?: string[];
} = {}): Metadata {
  const shareImage = ogImageUrl(image);
  // Our own og/ images are exactly 1200x630; other images keep their own size
  const isOgSize = Object.values(OG_IMAGES).includes(image as (typeof OG_IMAGES)[keyof typeof OG_IMAGES]);

  return {
    title: { absolute: title },
    description,
    keywords: keywords.join(', '),
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
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
      type,
      images: [
        {
          url: shareImage,
          ...(isOgSize ? { width: 1200, height: 630 } : {}),
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [shareImage],
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
