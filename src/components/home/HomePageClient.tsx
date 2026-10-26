'use client';

import React, { useState } from 'react';
import { INITIAL_PRODUCTS } from '@/data/products';
import { INITIAL_HOMEPAGE_REVIEWS } from '@/data/testimonials';
import QueryModal from '@/components/ui/QueryModal';
import FullWidthCreativeHero from '@/components/ui/FullWidthCreativeHero';
import HomeBlogSection from '@/components/ui/HomeBlogSection';
import HomeCuratedCollections from '@/components/home/HomeCuratedCollections';
import HomeCategoryCarousel from '@/components/home/HomeCategoryCarousel';
import HomeFeaturedRentals from '@/components/home/HomeFeaturedRentals';
import HomeHowItWorks from '@/components/home/HomeHowItWorks';
import HomeCustomerReviews from '@/components/home/HomeCustomerReviews';
import HomeFaq from '@/components/home/HomeFaq';
import HomeCtaBanner from '@/components/home/HomeCtaBanner';

interface HomePageClientProps {
  initialProducts: any[] | null;
  initialReviews: any[] | null;
  initialHero: any | null;
  initialBlogs: any[] | null;
}

export default function HomePageClient({
  initialProducts,
  initialReviews,
  initialHero,
  initialBlogs,
}: HomePageClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [attireGender, setAttireGender] = useState<'women' | 'men'>('women');

  // Products are loaded on the server; fall back to the sample catalog when the DB has none
  const productsList: any[] =
    initialProducts && initialProducts.length > 0
      ? initialProducts.map((p: any) => ({
          id: p.id || p._id || p.slug,
          _id: p._id,
          slug: p.slug,
          title: p.title,
          subtitle: p.subtitle || '',
          category: p.categorySlug || p.category || 'bridal-lehengas',
          categoryLabel: p.category || 'Bridal Lehengas',
          rentalPrice: p.price || p.rentalPrice || '',
          securityDeposit: p.deposit || p.securityDeposit || '',
          originalPrice: p.originalValue || p.originalPrice || '',
          color: p.color || '',
          fabric: p.fabric || '',
          embroidery: p.work || p.embroidery || '',
          occasion: p.occasion || '',
          description: p.description || '',
          includes: p.includes || [],
          images: p.images && p.images.length > 0 ? p.images : ['/hero-lehenga.jpg'],
          sizes: p.sizes || ['Custom Fit Available'],
          rentalDays: p.duration || p.rentalDays || '3 Days',
          isTrending: Boolean(p.featured ?? p.isTrending),
          status: p.status || 'available',
          reviews: p.reviews || [],
          metaDescription: p.description || '',
        }))
      : INITIAL_PRODUCTS;

  // Testimonials are loaded on the server; show featured ones, else all, else the sample reviews
  const featuredReviews = (initialReviews || []).filter((r: any) => r.isFeatured !== false);
  const reviewsList: any[] =
    initialReviews && initialReviews.length > 0
      ? featuredReviews.length > 0
        ? featuredReviews
        : initialReviews
      : INITIAL_HOMEPAGE_REVIEWS;

  // Prioritize outfits marked featured/trending, fallback to first 6
  const featured = (() => {
    const featuredItems = productsList.filter((p) => p.isTrending);
    if (featuredItems.length > 0) {
      return featuredItems.slice(0, 6);
    }
    return productsList.slice(0, 6);
  })();

  return (
    <div className="pb-10 sm:pb-14">
      {/* 1. Hero Banner */}
      <FullWidthCreativeHero initialData={initialHero} onOpenModal={() => setModalOpen(true)} />

      {/* 2. Curated Collections: Choose Your Wedding Attire (Men / Women) */}
      <HomeCuratedCollections
        attireGender={attireGender}
        setAttireGender={setAttireGender}
      />

      {/* 3. Explore Collections Carousel */}
      <HomeCategoryCarousel />

      {/* 4. Featured Outfits on Rent */}
      <HomeFeaturedRentals products={featured} />

      {/* 5. How The Rental Process Works */}
      <HomeHowItWorks />

      {/* 6. Customer Reviews & Stories */}
      <HomeCustomerReviews reviewsList={reviewsList} />

      {/* 7. Wedding Blog Stories & Rental Guides */}
      <HomeBlogSection initialPosts={initialBlogs ? initialBlogs.slice(0, 8) : undefined} />

      {/* 8. Frequently Asked Questions */}
      <HomeFaq />

      {/* 9. Direct CTA Banner */}
      <HomeCtaBanner onOpenModal={() => setModalOpen(true)} />

      {/* Inquiry Modal */}
      <QueryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
