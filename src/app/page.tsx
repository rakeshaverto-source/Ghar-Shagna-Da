'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MessageCircle, 
  ArrowRight, 
  Calendar,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { CATEGORIES, OCCASION_CATEGORIES, INITIAL_PRODUCTS, SITE_CONFIG } from '@/data/products';
import ProductCard from '@/components/catalog/ProductCard';
import QueryModal from '@/components/ui/QueryModal';
import FullWidthCreativeHero from '@/components/ui/FullWidthCreativeHero';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const featured = INITIAL_PRODUCTS.filter((p) => p.isTrending);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-10 sm:space-y-20 pb-16 sm:pb-20">
      {/* 1. EDITORIAL FULL-WIDTH CREATIVE HERO BANNER (NO MODELS, EDITORIAL TYPOGRAPHY & PILL CAPSULE) */}
      <FullWidthCreativeHero onOpenModal={() => setModalOpen(true)} />

      {/* 2. CURATED COLLECTIONS - CHOOSE YOUR WEDDING ATTIRE (ROUNDED ARCH ARCHITECTURAL CARDS) */}
      <section id="collections" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-10 scroll-mt-28">
        <div className="text-center space-y-1 sm:space-y-2 max-w-2xl mx-auto">
          <p className="font-script text-2xl sm:text-4xl text-[#8b1828] font-bold">
            Curated Collections
          </p>
          <h2 className="font-serif-luxury text-[22px] xs:text-2xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight whitespace-nowrap">
            Choose Your Wedding Attire
          </h2>
          <div className="w-16 sm:w-20 h-0.5 bg-[#8b1828]/40 mx-auto rounded-full mt-1.5 sm:mt-2" />
        </div>

        {/* 6 Arch Cards Grid with Model Pop-Out Effect & Unique Backgrounds */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 pt-4 sm:pt-10">
          {OCCASION_CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative flex flex-col items-center select-none"
            >
              {/* Outer Wrapper with Aspect Ratio */}
              <div className="relative w-full aspect-[9/16]">
                {/* 1. Arch Frame Background (Warm Studio Lighting per occasion) */}
                <div
                  className={`absolute inset-0 rounded-t-[3.5rem] sm:rounded-t-[4.5rem] rounded-b-xl border-[1.5px] ${cat.archBorder} bg-gradient-to-b ${cat.bgGradient} overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300`}
                >
                  {/* Studio Central Sunlight Beam */}
                  <div className={`absolute -inset-x-10 top-0 h-4/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${cat.spotlight}`} />
                  
                  {/* Left Side Soft Tone for text legibility */}
                  <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black/25 via-black/10 to-transparent z-10 pointer-events-none" />

                  {/* Soft bottom ground reflection */}
                  <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />
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
                    className={`rotate-180 font-cinzel font-bold tracking-[0.32em] sm:tracking-[0.38em] text-white text-xs sm:text-sm lg:text-[15px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] group-hover:${cat.accentColor} group-hover:scale-105 transition-all duration-300 uppercase`}
                  >
                    {cat.title}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. EXPLORE OUR COLLECTIONS - SHOP BY CATEGORY (INTERACTIVE HORIZONTAL LUXURY PILLAR CAROUSEL) */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 scroll-mt-28">
        {/* Section Header with Left-Right Carousel Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200/80 pb-5">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-script text-2xl sm:text-3xl text-[#8b1828] font-bold">
              Explore Our Collections
            </p>
            <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[0.14em] uppercase text-stone-900">
              SHOP BY CATEGORY
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-lg">
              Handcrafted royal attire for every ceremonial moment. Rent authentic designer couture with customized fitting.
            </p>
          </div>

          {/* Desktop/Tablet Slider Arrow Controls */}
          <div className="hidden sm:flex items-center gap-2 self-center md:self-end">
            <button
              onClick={() => scrollCategories('left')}
              aria-label="Previous Category"
              className="w-10 h-10 rounded-full border border-stone-300 hover:border-[#8b1828] hover:bg-[#8b1828] hover:text-white text-stone-700 flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCategories('right')}
              aria-label="Next Category"
              className="w-10 h-10 rounded-full border border-stone-300 hover:border-[#8b1828] hover:bg-[#8b1828] hover:text-white text-stone-700 flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track (Swipeable on touch & smoothly scrollable) */}
        <div
          ref={categoryScrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-6 pt-10 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar touch-pan-x snap-x snap-mandatory"
        >
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative flex-none w-[260px] xs:w-[280px] sm:w-[320px] lg:w-[340px] aspect-[9/14] snap-start flex flex-col justify-end select-none"
            >
              {/* 1. Base Card Container (Rounded Pillar with Background Gradient) */}
              <div
                className={`absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-b ${cat.bgGradient || 'from-stone-900 to-stone-950'} border border-stone-200/90 shadow-lg group-hover:shadow-2xl group-hover:border-amber-400/90 transition-all duration-500`}
              >
                {/* Studio Spotlight Light Layer */}
                {cat.spotlight && (
                  <div className={`absolute -inset-x-10 top-0 h-3/4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${cat.spotlight} pointer-events-none`} />
                )}

                {/* Bottom Vignette for Crisp Text */}
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none z-10" />

                {/* Top Luxury Pill Tag */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-block bg-white/95 backdrop-blur-md text-[#8b1828] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md border border-stone-200/60">
                    On Rent
                  </span>
                </div>
              </div>

              {/* 2. Model Image: Butter-Smooth 3D Pop-Out using GPU-accelerated translate-y (Zero shake) */}
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

              {/* 3. Card Content Information: Luxury Frosted Glass Tray for 100% Sharp Readability */}
              <div className="relative z-20 m-3 sm:m-4 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 space-y-1.5 text-white shadow-xl group-hover:border-amber-300/40 group-hover:bg-black/80 transition-all duration-300">
                <span className="font-script text-xl sm:text-2xl text-amber-300 block drop-shadow">
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
      </section>

      {/* 4. FEATURED HANDPICKED RENTALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <p className="font-script text-2xl text-[#8b1828]">Trending Now</p>
            <h2 className="font-serif-luxury text-3xl font-bold text-stone-900">
              Featured Outfits on Rent
            </h2>
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8b1828] hover:underline"
          >
            <span>View Complete Collection ({INITIAL_PRODUCTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. HOW THE RENTAL PROCESS WORKS */}
      <section className="bg-[#faf7f2] border-y border-[#f0eae1] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <p className="font-script text-3xl text-[#8b1828]">Effortless Journey</p>
            <h2 className="font-serif-luxury text-3xl font-bold text-stone-900">
              How Outfit Rental Works
            </h2>
            <p className="text-sm text-stone-600 max-w-lg mx-auto">
              Simple 4 steps designed for zero stress and complete bridal perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-7 rounded-3xl border border-[#f0eae1] card-shadow space-y-3">
              <span className="font-serif-luxury text-3xl font-black text-[#8b1828]/25 block">01</span>
              <h3 className="font-serif-luxury text-lg font-bold text-stone-900">1. Select & Inquire</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Choose your lehenga, dress, or sherwani. Click Enquire to check availability for your wedding date on WhatsApp.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-[#f0eae1] card-shadow space-y-3">
              <span className="font-serif-luxury text-3xl font-black text-[#8b1828]/25 block">02</span>
              <h3 className="font-serif-luxury text-lg font-bold text-stone-900">2. Custom Fitting</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Visit our boutique or provide your body measurements. Our master tailors customize the blouse, sleeves, and skirt height.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-[#f0eae1] card-shadow space-y-3">
              <span className="font-serif-luxury text-3xl font-black text-[#8b1828]/25 block">03</span>
              <h3 className="font-serif-luxury text-lg font-bold text-stone-900">3. Sanitized Pickup</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Receive the steam-sterilized outfit sealed in luxury garment packaging 1-2 days before your wedding ceremonies.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-[#f0eae1] card-shadow space-y-3">
              <span className="font-serif-luxury text-3xl font-black text-[#8b1828]/25 block">04</span>
              <h3 className="font-serif-luxury text-lg font-bold text-stone-900">4. Easy Return</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Return the outfit after the event without having to dry-clean it. Receive your full refundable deposit immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DIRECT CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#8b1828] to-[#a31f31] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl text-white">
          <p className="font-script text-3xl text-amber-200">
            Let Us Dress Your Shagna Di Raat
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold">
            Reserve Your Outfit Before Wedding Season Fills Up
          </h2>
          <p className="text-sm text-rose-100 max-w-xl mx-auto">
            Directly connect with our styling consultant to inspect sizes, check specific dates, or schedule an in-person trial appointment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello Ghar Shagna Da! I would like to book an appointment to try bridal lehengas and sherwanis.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 px-8 rounded-full text-sm shadow-md transition-transform hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Connect on WhatsApp</span>
            </a>

            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-stone-900 hover:bg-stone-100 font-bold py-3 px-8 rounded-full text-sm transition-all"
            >
              <Calendar className="w-4 h-4 text-[#8b1828]" />
              <span>Fill Quick Inquiry Form</span>
            </button>
          </div>
        </div>
      </section>

      <QueryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
