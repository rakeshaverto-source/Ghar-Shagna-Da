'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/data/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomeCategoryCarousel() {
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="categories"
      className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-4 sm:space-y-10 scroll-mt-28"
    >
      {/* Section Header */}
      <div className="relative pb-1 sm:pb-3 flex flex-col items-center text-center">
        <div className="space-y-0.5 sm:space-y-1.5 max-w-2xl mx-auto">
          <p className="font-script text-2xl xs:text-3xl sm:text-5xl text-[#8b1828] font-bold leading-none">
            Explore Our Collections
          </p>
          <h2 className="font-cinzel text-lg xs:text-xl sm:text-3xl lg:text-4xl font-bold tracking-[0.08em] sm:tracking-[0.14em] uppercase text-stone-900 leading-snug">
            RENT BY CATEGORY
          </h2>
          <div className="w-12 sm:w-20 h-0.5 bg-[#8b1828]/40 mx-auto rounded-full mt-1 sm:mt-2" />
        </div>
      </div>

      {/* Category Carousel Container */}
      <div className="relative group/carousel">
        {/* Left Arrow Button */}
        <button
          onClick={() => scrollCategories('left')}
          aria-label="Previous Category"
          className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/95 hover:bg-[#8b1828] text-stone-800 hover:text-white border border-stone-200 shadow-xl items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => scrollCategories('right')}
          aria-label="Next Category"
          className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/95 hover:bg-[#8b1828] text-stone-800 hover:text-white border border-stone-200 shadow-xl items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Horizontal Carousel Track */}
        <div
          ref={categoryScrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-0 sm:pb-6 pt-6 sm:pt-10 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar touch-pan-x snap-x snap-mandatory"
        >
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative flex-none w-[260px] xs:w-[280px] sm:w-[320px] lg:w-[340px] aspect-[9/14] snap-start flex flex-col justify-end select-none"
            >
              {/* 1. Base Card Container */}
              <div
                className={`absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-b ${
                  cat.bgGradient || 'from-stone-900 to-stone-950'
                } border border-stone-200/90 shadow-lg group-hover:shadow-2xl group-hover:border-amber-400/90 transition-all duration-500`}
              >
                {/* Spotlight Layer */}
                {cat.spotlight && (
                  <div
                    className={`absolute -inset-x-10 top-0 h-3/4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${cat.spotlight} pointer-events-none`}
                  />
                )}

                {/* Bottom Vignette */}
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none z-10" />

                {/* Top Pill Tag */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-block bg-white/95 backdrop-blur-md text-[#8b1828] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md border border-stone-200/60">
                    On Rent
                  </span>
                </div>
              </div>

              {/* 2. Model Image */}
              <div className="absolute inset-0 z-15 pointer-events-none overflow-visible flex items-end justify-center">
                <div className="relative w-full h-[108%] -top-2 transition-transform duration-500 ease-out will-change-transform transform-gpu group-hover:-translate-y-5">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    priority={idx < 2}
                    sizes="(max-width: 640px) 280px, 340px"
                    className="object-contain object-bottom drop-shadow-[0_12px_22px_rgba(0,0,0,0.55)] group-hover:drop-shadow-[0_20px_35px_rgba(0,0,0,0.75)] transition-all duration-500"
                  />
                </div>
              </div>

              {/* 3. Card Content */}
              <div className="relative z-20 m-3 sm:m-4 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 space-y-1.5 text-white shadow-xl group-hover:border-amber-300/40 group-hover:bg-black/80 transition-all duration-300">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-amber-300/90 block">
                  {cat.handwrittenSubtitle}
                </span>
                <h3 className="font-cinzel text-lg sm:text-xl font-bold tracking-wide text-white group-hover:text-amber-200 transition-colors drop-shadow">
                  {cat.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-300 line-clamp-2 leading-relaxed">
                  {cat.tagline}
                </p>
                <div className="pt-1.5 flex items-center text-xs font-semibold text-amber-300 gap-1.5 group-hover:translate-x-1.5 transition-transform duration-300">
                  <span>Explore Designs</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
