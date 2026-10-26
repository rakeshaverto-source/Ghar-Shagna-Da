'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { OCCASION_CATEGORIES, OCCASION_CATEGORIES_MEN } from '@/data/products';
import { categoryPath } from '@/lib/categoryRoutes';

interface HomeCuratedCollectionsProps {
  attireGender: 'women' | 'men';
  setAttireGender: (gender: 'women' | 'men') => void;
}

export default function HomeCuratedCollections({
  attireGender,
  setAttireGender,
}: HomeCuratedCollectionsProps) {
  const currentOccasions =
    attireGender === 'women' ? OCCASION_CATEGORIES : OCCASION_CATEGORIES_MEN;

  return (
    <section
      id="collections"
      className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 sm:pt-14 pb-4 space-y-6 sm:space-y-10 scroll-mt-28"
    >
      <div className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto">
        <p className="font-script text-2xl xs:text-3xl sm:text-5xl text-[#8b1828] font-bold leading-none">
          Curated Collections
        </p>
        <h2 className="font-serif-luxury text-xl xs:text-2xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight whitespace-nowrap leading-snug">
          Choose Your Wedding Attire
        </h2>
        <div className="w-12 sm:w-20 h-0.5 bg-[#8b1828]/40 mx-auto rounded-full my-3" />

        {/* Luxury Men / Women Toggle Selector */}
        <div className="flex items-center justify-center pt-3 sm:pt-4">
          <div className="inline-flex p-1 sm:p-1.5 rounded-full bg-stone-100 border border-stone-200/90 shadow-inner">
            <button
              type="button"
              onClick={() => setAttireGender('women')}
              className={`relative px-5 sm:px-8 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 ${
                attireGender === 'women'
                  ? 'bg-[#8b1828] text-white shadow-md shadow-[#8b1828]/30 scale-[1.02]'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              WOMEN
            </button>
            <button
              type="button"
              onClick={() => setAttireGender('men')}
              className={`relative px-5 sm:px-8 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 ${
                attireGender === 'men'
                  ? 'bg-[#8b1828] text-white shadow-md shadow-[#8b1828]/30 scale-[1.02]'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              MEN
            </button>
          </div>
        </div>
      </div>

      {/* 6 Arch Cards Grid with Model Pop-Out Effect & Unique Backgrounds */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 pt-4 sm:pt-10 transition-all duration-500">
        {currentOccasions.map((cat, idx) => (
          <Link
            key={`${attireGender}-${cat.id}`}
            href={categoryPath(cat.slug)}
            className="group relative flex flex-col items-center select-none"
          >
            {/* Outer Wrapper with Aspect Ratio */}
            <div className="relative w-full aspect-[9/16]">
              {/* 1. Arch Frame Background (Warm Studio Lighting per occasion) */}
              <div
                className={`absolute inset-0 rounded-t-[3.5rem] sm:rounded-t-[4.5rem] rounded-b-xl border-[1.5px] ${cat.archBorder} bg-gradient-to-b ${cat.bgGradient} overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300`}
              >
                {/* Studio Central Sunlight Beam */}
                <div
                  className={`absolute -inset-x-10 top-0 h-4/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${cat.spotlight}`}
                />

                {/* Left Side Soft Tone for text legibility */}
                <div
                  className={`absolute inset-y-0 left-0 w-1/4 ${
                    attireGender === 'men'
                      ? 'bg-gradient-to-r from-stone-900/10 via-stone-900/5 to-transparent'
                      : 'bg-gradient-to-r from-black/25 via-black/10 to-transparent'
                  } z-10 pointer-events-none`}
                />

                {/* Soft bottom ground reflection */}
                <div
                  className={`absolute inset-x-0 bottom-0 h-1/5 ${
                    attireGender === 'men'
                      ? 'bg-gradient-to-t from-stone-900/10 to-transparent'
                      : 'bg-gradient-to-t from-black/20 to-transparent'
                  } z-10 pointer-events-none`}
                />
              </div>

              {/* 2. Model Image: Pops out of top frame (-top-7 to -top-9, scale effect) */}
              <div className="absolute -top-7 sm:-top-9 inset-x-0 bottom-0 z-20 pointer-events-none flex items-end justify-center overflow-visible">
                <div className="relative w-full h-[115%]">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    priority={idx < 3}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-contain object-bottom group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_14px_22px_rgba(0,0,0,0.35)]"
                  />
                </div>
              </div>

              {/* 3. Category Title: Vertical text along the LEFT edge of each card */}
              <div className="absolute top-8 bottom-6 left-1.5 sm:left-3 z-30 flex items-center justify-center pointer-events-none">
                <span
                  style={{ writingMode: 'vertical-rl' }}
                  className={`rotate-180 font-cinzel font-bold tracking-[0.32em] sm:tracking-[0.38em] ${
                    attireGender === 'men'
                      ? 'text-stone-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]'
                      : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]'
                  } text-xs sm:text-sm lg:text-[15px] group-hover:${cat.accentColor} group-hover:scale-105 transition-all duration-300 uppercase`}
                >
                  {cat.title}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
