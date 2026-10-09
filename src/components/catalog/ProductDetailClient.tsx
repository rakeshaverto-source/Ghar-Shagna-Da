'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';
import QueryModal from '@/components/ui/QueryModal';
import { ReviewItem, DEFAULT_REVIEWS } from './product-detail/reviewsData';
import ProductImageGallery from './product-detail/ProductImageGallery';
import ProductInfo from './product-detail/ProductInfo';
import ProductReviewsSection from './product-detail/ProductReviewsSection';
import RelatedProductsSection from './product-detail/RelatedProductsSection';
import WriteReviewModal from './product-detail/WriteReviewModal';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(true);

  // Reviews initialized from product.reviews if set in Admin, else fallback defaults
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    if (product.reviews && product.reviews.length > 0) {
      return product.reviews.map((r) => ({
        author: r.author,
        city: r.city || 'Punjab',
        date: r.date || 'Recent',
        rating: r.rating || 5,
        comment: r.comment,
        image: r.image || undefined,
        tag: r.tag || 'Verified Bride',
      }));
    }
    return DEFAULT_REVIEWS;
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Rent ${product.title} at Ghar Shagna Da`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddReview = (newRev: ReviewItem) => {
    setReviews((prev) => [newRev, ...prev]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-16 space-y-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" className="hover:text-[#8b1828]">
          Home
        </Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-[#8b1828]">
          Catalog
        </Link>
        <span>/</span>
        <Link href={`/category/${product.category}`} className="hover:text-[#8b1828]">
          {product.categoryLabel}
        </Link>
        <span>/</span>
        <span className="text-[#8b1828] font-semibold truncate max-w-[200px] sm:max-w-none">
          {product.title}
        </span>
      </nav>

      {/* Main Details Section: Image Gallery (Left) & Product Info (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <ProductImageGallery
          images={product.images}
          title={product.title}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />

        <ProductInfo
          product={product}
          copied={copied}
          onShare={handleShare}
          onOpenBookingModal={() => setModalOpen(true)}
        />
      </div>

      {/* Customer Reviews Section */}
      <ProductReviewsSection
        reviews={reviews}
        showAllReviews={showAllReviews}
        setShowAllReviews={setShowAllReviews}
        onOpenWriteReview={() => setReviewModalOpen(true)}
      />

      {/* Related Products Carousel */}
      <RelatedProductsSection
        relatedProducts={relatedProducts}
        currentCategory={product.category}
        categoryLabel={product.categoryLabel}
      />

      {/* Booking / Trial Inquiry Modal */}
      <QueryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productTitle={product.title}
        productPrice={product.rentalPrice}
      />

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmitReview={handleAddReview}
      />
    </div>
  );
}
