'use client';

import React, { useRef } from 'react';
import { Star, CheckCircle, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

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

        {/* Action Buttons & Slider Controls */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 pt-2 md:pt-0">
          <a
            href="https://share.google/P3z7HeNIGr6SuAloT"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 bg-white hover:bg-stone-50 hover:border-[#8b1828] text-stone-800 hover:text-[#8b1828] text-xs sm:text-sm font-medium shadow-sm transition-all duration-300 group"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.665-5.17 3.665-9.09z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.1C3.28 21.44 7.35 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.1z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.28 2.56 1.25 6.58l4.03 3.1c.95-2.83 3.6-4.93 6.72-4.93z"
              />
            </svg>
            <span>Write / View on Google</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#8b1828] transition-colors" />
          </a>

          <div className="hidden md:flex items-center gap-2">
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
      </div>

      {/* Reviews Horizontal Carousel Track */}
      <div
        ref={reviewScrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar touch-pan-x snap-x snap-mandatory"
      >
        {reviewsList.map((rev, idx) => (
          <a
            key={rev._id || rev.id || idx}
            href="https://share.google/P3z7HeNIGr6SuAloT"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-none w-[280px] sm:w-[320px] lg:w-[340px] snap-start bg-white rounded-2xl p-6 border border-stone-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(139,24,40,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer group text-left"
          >
            <div>
              {/* Customer Initials Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-full bg-[#8b1828]/10 text-[#8b1828] font-bold text-sm flex items-center justify-center shrink-0 border border-[#8b1828]/15 group-hover:bg-[#8b1828] group-hover:text-white transition-colors duration-300">
                  {rev.author ? rev.author.charAt(0).toUpperCase() : 'B'}
                </div>

                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-stone-900 block truncate text-xs sm:text-sm group-hover:text-[#8b1828] transition-colors">
                    {rev.author}
                  </span>
                  <span className="text-[11px] text-stone-400 block truncate">
                    {rev.city} • {rev.date}
                  </span>
                </div>

                <svg className="w-4 h-4 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.665-5.17 3.665-9.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.1C3.28 21.44 7.35 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.1z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.28 2.56 1.25 6.58l4.03 3.1c.95-2.83 3.6-4.93 6.72-4.93z"
                  />
                </svg>
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
              <span className="text-[11px] text-stone-400 truncate flex items-center gap-1 group-hover:text-[#8b1828] transition-colors">
                View on Google <ExternalLink className="w-3 h-3" />
              </span>
              <div className="flex-shrink-0 inline-flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] whitespace-nowrap">
                <CheckCircle className="w-3 h-3 fill-emerald-600 text-white flex-shrink-0" />
                <span>{rev.tag || 'Verified Bride'}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
