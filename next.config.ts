import type { NextConfig } from "next";

// Blog posts from the old WordPress site, which lived at /<slug>/ and now live at /blog/<slug>
const WORDPRESS_POST_SLUGS = [
  'rental-bridal-lehengas-chandigarh',
  'bridal-lehengas-on-rent-in-panchkula',
  'wedding-dresses-on-rent-in-mohali',
  'wedding-dresses-on-rent-in-zirakpur',
  'wedding-dresses-on-rent-in-panchkula',
  'sherwanis-on-rent-in-zirakpur',
  'sherwani-on-rent-in-mohali',
  'sherwani-on-rent-in-panchkula',
  'wedding-accessories-on-rent-in-panchkula',
  'wedding-accessories-on-rent-in-chandigarh',
  'wedding-accessories-on-rent-in-mohali',
  'bridal-lehengas-on-rent-in-zirakpur',
  'bridal-lehengas-on-rent-in-mohali',
  'bridal-lehengas-on-rent-in-punjab',
  'bridal-lehengas-on-rent-in-haryana',
  'sherwani-on-rent-in-haryana',
  'wedding-dresses-on-rent-in-punjab',
  'sherwani-on-rent-in-punjab',
  'wedding-dresses-on-rent-in-haryana',
  'wedding-accessories-on-rent-in-punjab',
  'bridal-lehengas-on-rent-in-dera-bassi',
  'wedding-dresses-on-rent-in-dera-bassi',
  'sherwani-on-rent-in-dera-bassi',
  'lehengas-on-rent-in-chandigarh',
  'wedding-dresses-on-rent-in-chandigarh',
  'sherwanis-on-rent-in-chandigarh',
];

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    // Old WordPress URLs keep their Google ranking by pointing permanently at the new pages
    return [
      { source: `/:slug(${WORDPRESS_POST_SLUGS.join('|')})`, destination: '/blog/:slug', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/about', destination: '/how-rental-works', permanent: true },
      { source: '/home-new', destination: '/', permanent: true },
      { source: '/category/lehengas', destination: '/category/bridal-lehengas', permanent: true },
      { source: '/category/wedding-accessories', destination: '/catalog', permanent: true },
      { source: '/tag/:tag*', destination: '/blog', permanent: true },
      { source: '/author/:name*', destination: '/blog', permanent: true },
      { source: '/feed', destination: '/blog', permanent: true },
      { source: '/:sitemap(sitemap_index|post-sitemap|page-sitemap|category-sitemap|post_tag-sitemap).xml', destination: '/sitemap.xml', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Tell browsers to always use HTTPS for this site (HSTS), for one year
        source: '/:path*',
        headers: [{ key: 'Strict-Transport-Security', value: 'max-age=31536000' }],
      },
      {
        // Push notification service worker: always fetch the latest version
        source: '/sw.js',
        headers: [
          { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
