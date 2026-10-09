'use client';

import React from 'react';
import Image from 'next/image';
import { ReviewItem } from './reviewsData';

interface ProductReviewsSectionProps {
  reviews: ReviewItem[];
  showAllReviews: boolean;
  setShowAllReviews: (val: boolean | ((prev: boolean) => boolean)) => void;
  onOpenWriteReview: () => void;
}

export default function ProductReviewsSection({
  reviews,
  showAllReviews,
  setShowAllReviews,
  onOpenWriteReview,
}: ProductReviewsSectionProps) {
  return (
    <section className="border-t border-stone-200/90 pt-12 space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          Customer Reviews
        </h2>

        <div className="flex items-center gap-2.5 mt-2.5">
          <div className="flex items-center text-amber-400 text-lg">
            ★★★★★
          </div>
          <span className="text-sm font-medium text-stone-700">
            {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
          </span>
        </div>
      </div>

      {/* Write a review button */}
      <button
        onClick={onOpenWriteReview}
        className="w-full py-2.5 px-4 rounded-md border border-stone-300 hover:border-stone-500 bg-white hover:bg-stone-50 text-stone-900 text-sm font-normal transition-all text-center shadow-2xs cursor-pointer"
      >
        Write a review
      </button>

      {/* Photo Reviews Masonry */}
      <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4 pt-2">
        {reviews.slice(0, showAllReviews ? reviews.length : 7).map((rev, idx) => (
          <div
            key={idx}
            className="break-inside-avoid bg-white rounded-lg border border-stone-200 overflow-hidden shadow-2xs flex flex-col hover:shadow-md transition-shadow"
          >
            {/* Customer Photo */}
            {rev.image && (
              <div className="relative w-full aspect-[4/5] bg-stone-100 overflow-hidden">
                <Image
                  src={rev.image}
                  alt={`${rev.author} review`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top hover:scale-102 transition-transform duration-300"
                />
              </div>
            )}

            {/* Review Details */}
            <div className="p-4 space-y-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-stone-900">
                    {rev.author}
                  </span>
                  <span className="w-3.5 h-3.5 rounded-full bg-black text-white text-[8px] font-bold flex items-center justify-center shrink-0">
                    ✓
                  </span>
                </div>
                <p className="text-[11px] text-stone-400">
                  {rev.date} {rev.city ? `• ${rev.city}` : ''}
                </p>
              </div>

              {/* Stars */}
              <div className="flex text-amber-400 text-xs tracking-tight">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < rev.rating ? 'text-amber-400' : 'text-stone-300'}>
                    ★
                  </span>
                ))}
              </div>

              {/* Comment Text */}
              <p className="text-xs text-stone-700 leading-relaxed font-normal pt-0.5">
                {rev.comment}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Reviews Button */}
      {reviews.length > 7 && (
        <div className="flex justify-center pt-3">
          <button
            onClick={() => setShowAllReviews((prev) => !prev)}
            className="px-6 py-2 rounded border border-stone-300 hover:border-stone-400 bg-white text-stone-700 text-xs font-normal transition-all shadow-2xs cursor-pointer"
          >
            {showAllReviews ? 'Show fewer reviews' : 'Show more reviews'}
          </button>
        </div>
      )}

      {/* Trust Badges Bar */}
      <div className="bg-stone-900 text-white p-5 rounded-2xl flex flex-wrap items-center justify-around gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 text-base">✓</span>
          <span>100% Sanitized & Steam Cleaned</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-amber-400 text-base">✓</span>
          <span>Free Custom Alteration Fitting</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-amber-400 text-base">✓</span>
          <span>Zero Damage Stress Guarantee</span>
        </div>
      </div>
    </section>
  );
}
