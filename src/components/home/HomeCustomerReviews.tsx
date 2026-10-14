'use client';

import React, { useRef } from 'react';
import { Star, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface HomeCustomerReviewsProps {
  reviewsList: any[];
}

export default function HomeCustomerReviews({ reviewsList }: HomeCustomerReviewsProps) {
  const reviewScrollRef = useRef<HTMLDivElement>(null);

  const scrollReviews = (direction: 'left' | 'right') => {
    if (reviewScrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      reviewScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-4 sm:py-6 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto space-y-4 sm:space-y-5">
      {/* Header with Navigation Controls */}
      <div className="relative flex flex-col md:flex-row md:items-end justify-between items-center text-center md:text-left gap-3 pb-0.5">
        <div className="space-y-1 sm:space-y-1.5 max-w-2xl">
          <p className="font-script text-2xl sm:text-3xl text-[#8b1828]">
            Loved By Real Brides
          </p>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-[38px] font-bold text-stone-900 tracking-tight leading-tight">
            Customer Reviews & Stories
          </h2>
          <div className="w-16 h-0.5 bg-[#8b1828]/40 mx-auto md:mx-0 rounded-full mt-1.5" />
          <p className="text-xs sm:text-sm text-stone-500 pt-0.5">
            4.8 / 5.0 Average Rating from 350+ Happy Couples across Punjab & Overseas
          </p>
        </div>

        {/* Slider Prev / Next Controls */}
        <div className="hidden md:flex items-center gap-2 pt-2 md:pt-0">
          <button
            onClick={() => scrollReviews('left')}
            aria-label="Previous Review"
            className="w-10 h-10 rounded-full border border-stone-300 hover:border-[#8b1828] hover:bg-[#8b1828] hover:text-white text-stone-700 flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95 bg-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollReviews('right')}
            aria-label="Next Review"
            className="w-10 h-10 rounded-full border border-stone-300 hover:border-[#8b1828] hover:bg-[#8b1828] hover:text-white text-stone-700 flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95 bg-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Reviews Horizontal Carousel Track */}
      <div
        ref={reviewScrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar touch-pan-x snap-x snap-mandatory"
      >
        {reviewsList.map((rev, idx) => (
          <div
            key={rev._id || rev.id || idx}
            className="flex-none w-[280px] sm:w-[320px] lg:w-[340px] snap-start bg-white rounded-2xl p-6 border border-stone-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(139,24,40,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between select-none"
          >
            <div>
              {/* Customer Initials Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-full bg-[#8b1828]/10 text-[#8b1828] font-bold text-sm flex items-center justify-center shrink-0 border border-[#8b1828]/15">
                  {rev.author ? rev.author.charAt(0).toUpperCase() : 'B'}
                </div>

                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-stone-900 block truncate text-xs sm:text-sm">
                    {rev.author}
                  </span>
                  <span className="text-[11px] text-stone-400 block truncate">
                    {rev.city} • {rev.date}
                  </span>
                </div>
              </div>

              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < (rev.rating || 5)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-stone-200 text-stone-200'
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-normal mb-4 line-clamp-4 italic">
                &ldquo;{rev.comment}&rdquo;
              </p>

              {/* Associated Outfit Title */}
              {rev.productTitle && (
                <p className="text-[10px] text-[#8b1828] font-semibold truncate mb-2">
                  Outfit: {rev.productTitle}
                </p>
              )}
            </div>

            {/* Author & Verification Footer */}
            <div className="border-t border-stone-100 pt-3 flex items-center justify-between gap-2 text-[11px] text-stone-500 mt-2">
              <span className="text-[11px] text-stone-400 truncate">
                Verified Booking
              </span>
              <div className="flex-shrink-0 inline-flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] whitespace-nowrap">
                <CheckCircle className="w-3 h-3 fill-emerald-600 text-white flex-shrink-0" />
                <span>{rev.tag || 'Verified Bride'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
