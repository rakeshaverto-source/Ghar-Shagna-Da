'use client';

import React, { useState, useEffect } from 'react';
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

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState<any[]>(INITIAL_HOMEPAGE_REVIEWS);
  const [productsList, setProductsList] = useState<any[]>(INITIAL_PRODUCTS);
  const [attireGender, setAttireGender] = useState<'women' | 'men'>('women');

  // Load dynamic products from MongoDB
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.products && data.products.length > 0) {
          const mapped = data.products.map((p: any) => ({
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
            images: p.images && p.images.length > 0 ? p.images : ['/products/lehenga-maroon.png'],
            sizes: p.sizes || ['Custom Fit Available'],
            rentalDays: p.duration || p.rentalDays || '3 Days',
            isTrending: Boolean(p.featured ?? p.isTrending),
            status: p.status || 'available',
            reviews: p.reviews || [],
            metaDescription: p.description || '',
          }));
          setProductsList(mapped);
        }
      })
      .catch((err) => {
        console.error('Failed to load dynamic outfits', err);
      });
  }, []);

  // Load dynamic testimonials from MongoDB
  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews && data.reviews.length > 0) {
          const featuredOnly = data.reviews.filter((r: any) => r.isFeatured !== false);
          setReviewsList(featuredOnly.length > 0 ? featuredOnly : data.reviews);
        }
      })
      .catch((err) => {
        console.error('Failed to load testimonials', err);
      });
  }, []);

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
      <FullWidthCreativeHero onOpenModal={() => setModalOpen(true)} />

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
      <HomeBlogSection />

      {/* 8. Frequently Asked Questions */}
      <HomeFaq />

      {/* 9. Direct CTA Banner */}
      <HomeCtaBanner onOpenModal={() => setModalOpen(true)} />

      {/* Inquiry Modal */}
      <QueryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
