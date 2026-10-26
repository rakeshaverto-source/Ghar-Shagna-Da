import { connection } from 'next/server';
import { getPublicBlogPosts, getPublicHero, getPublicProducts, getPublicTestimonials } from '@/lib/publicData';
import HomePageClient from '@/components/home/HomePageClient';
import { constructMetadata, OG_IMAGES } from '@/lib/seo';

// Home page shares the brand logo on WhatsApp/Facebook
export const metadata = constructMetadata({ image: OG_IMAGES.logo, canonical: '/' });

// Render with real DB data on the server so visitors don't see sample content first
export const instant = false;

export default async function HomePage() {
  await connection();
  const [products, reviews, hero, blogs] = await Promise.all([
    getPublicProducts(),
    getPublicTestimonials(),
    getPublicHero(),
    getPublicBlogPosts(),
  ]);

  return (
    <HomePageClient
      initialProducts={products}
      initialReviews={reviews}
      initialHero={hero}
      initialBlogs={blogs}
    />
  );
}
