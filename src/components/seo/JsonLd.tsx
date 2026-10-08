import React from 'react';
import { SITE_CONFIG, Product } from '@/data/products';

export function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: SITE_CONFIG.name,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200',
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductJsonLd({ product }: { product: Product }) {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    image: product.images,
    description: product.description,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    category: product.categoryLabel,
    offers: {
      '@type': 'Offer',
      url: `${SITE_CONFIG.domain}/product/${product.slug}`,
      priceCurrency: 'INR',
      price: product.rentalPrice.replace(/[^\d]/g, ''),
      priceValidUntil: '2028-12-31',
      itemCondition: 'https://schema.org/UsedCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
      },
      businessFunction: 'http://purl.org/goodrelations/v1#LeaseOut',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
