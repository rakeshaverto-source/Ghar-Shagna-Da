import { connection } from 'next/server';
import { getPublicBlogPosts, getPublicHero, getPublicProducts, getPublicTestimonials } from '@/lib/publicData';
import HomePageClient from '@/components/home/HomePageClient';
import { constructMetadata, OG_IMAGES } from '@/lib/seo';

// Home page shares the brand logo on WhatsApp/Facebook
// Title kept from the old WordPress homepage, which already ranks for these searches
export const metadata = constructMetadata({
  title: 'Ghar Shagna Da - Best Bridal Lehenga and Sherwani on Rent in Tricity',
  description:
    'Ghar Shagna Da is a leading wedding & special-occasion outfit store in Chandigarh. Best bridal lehenga and sherwani on rent in Tricity – Chandigarh, Mohali, Panchkula & Zirakpur.',
  image: OG_IMAGES.logo,
  canonical: '/',
});

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
