import React from 'react';
import { SITE_CONFIG } from '@/data/products';

export interface ProductSchemaInput {
  id: string;
  slug: string;
  title: string;
  description: string;
  price?: string;
  rentalPrice?: string;
  originalPrice?: string;
  originalValue?: string;
  images: string[];
  category?: string;
  categoryLabel?: string;
  fabric?: string;
  color?: string;
  work?: string;
  embroidery?: string;
  status?: string;
  rating?: number;
  reviewsCount?: number;
}

/**
 * 1. ClothingStore / LocalBusiness Schema (Fixed for all pages via layout.tsx)
 */
export function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: SITE_CONFIG.name,
    image: `${SITE_CONFIG.domain}/og/bride.jpg`,
    '@id': `${SITE_CONFIG.domain}/#clothingstore`,
    url: SITE_CONFIG.domain,
    telephone: SITE_CONFIG.phone,
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address,
      addressLocality: 'Punjab',
      addressRegion: 'PB',
      postalCode: '141001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.901,
      longitude: 75.8573,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '20:30',
      },
    ],
    description: SITE_CONFIG.description,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Bridal & Groom Rental Collection',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Bridal Lehengas on Rent',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Sherwanis on Rent',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Wedding Dresses & Gowns on Rent',
        },
      ],
    },
  };

  return (
    <script
      id="schema-localbusiness"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * 2. WebSite Schema with Sitelinks SearchBox (Fixed in layout.tsx)
 */
export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.domain,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.domain}/catalog?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      id="schema-website"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * 3. Dynamic Product / Offer Schema (Live from Database / Outfit data)
 */
export function ProductJsonLd({ product }: { product: ProductSchemaInput }) {
  // Extract clean numerical price from string e.g. "₹8,999" -> "8999"
  const rawPrice = product.price || product.rentalPrice || '0';
  const cleanPrice = rawPrice.replace(/[^\d]/g, '') || '0';

  // Availability status based on actual live DB status
  const isAvailable = product.status ? product.status === 'available' : true;
  const availabilityUrl = isAvailable
    ? 'https://schema.org/InStock'
    : 'https://schema.org/OutOfStock';

  // Build full absolute image URLs for Googlebot
  const cleanImages = (product.images || []).map((img) =>
    img.startsWith('http') ? img : `${SITE_CONFIG.domain}${img.startsWith('/') ? img : `/${img}`}`
  );

  const categoryName = product.categoryLabel || product.category || 'Bridal Wear';
  // Only real, approved reviews may be reported to search engines; no reviews means no rating
  const reviewCount = product.reviewsCount || 0;
  const aggregateRating =
    reviewCount > 0 && product.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: product.rating.toFixed(1),
          reviewCount: reviewCount.toString(),
          bestRating: '5',
          worstRating: '1',
        }
      : undefined;

  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    image: cleanImages.length > 0 ? cleanImages : [`${SITE_CONFIG.domain}/hero-bride.jpg`],
    description: product.description,
    sku: product.id || product.slug,
    mpn: product.id || product.slug,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    category: categoryName,
    color: product.color || undefined,
    material: product.fabric || undefined,
    pattern: product.work || product.embroidery || undefined,
    aggregateRating,
    offers: {
      '@type': 'Offer',
      url: `${SITE_CONFIG.domain}/product/${product.slug}`,
      priceCurrency: 'INR',
      price: cleanPrice,
      priceValidUntil: '2028-12-31',
      itemCondition: 'https://schema.org/UsedCondition',
      availability: availabilityUrl,
      seller: {
        '@type': 'ClothingStore',
        name: SITE_CONFIG.name,
        telephone: SITE_CONFIG.phone,
        url: SITE_CONFIG.domain,
      },
      businessFunction: 'http://purl.org/goodrelations/v1#LeaseOut',
    },
  };

  return (
    <script
      id={`schema-product-${product.id || product.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * 4. BreadcrumbList Schema (Auto-generated for Category, Catalog & Product pages)
 */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      id="schema-breadcrumb"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * 5. BlogPosting / Article Schema (For Blog Detail Pages)
 */
export function BlogPostingJsonLd({
  title,
  description,
  slug,
  date,
  author,
  image,
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  image: string;
}) {
  const postUrl = `${SITE_CONFIG.domain}/blog/${slug}`;
  const fullImage = image.startsWith('http')
    ? image
    : `${SITE_CONFIG.domain}${image.startsWith('/') ? image : `/${image}`}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    headline: title,
    description: description,
    image: [fullImage],
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Person',
      name: author || 'Ghar Shagna Da Editorial Team',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.domain}/logo.png`,
      },
    },
  };

  return (
    <script
      id={`schema-blog-${slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
