'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight, Calendar } from 'lucide-react';

interface CreativeSlide {
  id: string;
  desktopImage: string;
  mobileImage: string;
  subtitle: string;
  headingPrefix: string;
  headingHighlight: string;
  tagline: string;
  subtagline: string;
  ctaText: string;
  ctaLink: string;
  theme: 'warm' | 'dark';
}

const CREATIVE_SLIDES: CreativeSlide[] = [
  {
    id: 'slide-1',
    desktopImage: '/creative-bridal.jpg',
    mobileImage: '/mobile-bridal.jpg',
    subtitle: 'CRAFTED TO CELEBRATE',
    headingPrefix: 'SHAGNA DI',
    headingHighlight: 'Raat',
    tagline: 'TIMELESS DESIGNS. SHAHI ANDAAZ.',
    subtagline: 'Khaas lamhon ke liye, sabse khoobsurat bridal lehengas on rent.',
    ctaText: 'Explore Bridal Rentals',
    ctaLink: '/category/bridal-lehengas',
    theme: 'warm',
  },
  {
    id: 'slide-2',
    desktopImage: '/creative-groom.jpg',
    mobileImage: '/mobile-groom.jpg',
    subtitle: 'HERITAGE ROOTS.',
    headingPrefix: 'SHAHI',
    headingHighlight: 'Dulha',
    tagline: 'TRADITIONAL WEAR, REDEFINED.',
    subtagline: 'Shaandaar groom sherwanis & achkans, tailored to your perfection.',
    ctaText: 'Explore Groom Rentals',
    ctaLink: '/category/sherwanis',
    theme: 'dark',
  },
];

interface FullWidthHeroProps {
  onOpenModal: () => void;
}

export default function FullWidthCreativeHero({ onOpenModal }: FullWidthHeroProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % CREATIVE_SLIDES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % CREATIVE_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + CREATIVE_SLIDES.length) % CREATIVE_SLIDES.length);
  };

  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    // Minimum swipe threshold (40px)
    if (distance > 40) {
      // Swiped left -> Next slide
      nextSlide();
    } else if (distance < -40) {
      // Swiped right -> Previous slide
      prevSlide();
    }
    setTouchStart(null);
  };

  return (
    <section 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[560px] sm:h-[650px] lg:h-[760px] overflow-hidden bg-stone-950 select-none touch-pan-y"
    >
      {/* Background Slides */}
      {CREATIVE_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Desktop & Tablet Landscape Image (Hidden on Phone) */}
          <div className="hidden md:block absolute inset-0 overflow-hidden">
            <Image
              src={slide.desktopImage}
              alt={slide.headingPrefix}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Dedicated Mobile & Portrait Image: Edge-to-edge full width without any side spaces */}
          <div className="block md:hidden absolute inset-0 overflow-hidden">
            <Image
              src={slide.mobileImage}
              alt={slide.headingPrefix}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-[center_15%]"
            />
          </div>

          {/* Cinematic Vignette Overlay (Leaves dress clear, dark only under text) */}
          <div
            className={`absolute inset-0 ${
              slide.theme === 'warm'
                ? 'bg-gradient-to-t md:bg-gradient-to-r from-stone-950 via-stone-950/80 via-30% to-transparent'
                : 'bg-gradient-to-t md:bg-gradient-to-r from-black via-black/85 via-30% to-transparent'
            }`}
          />

          {/* Slide Content Layer: Positioned cleanly at bottom without covering the lehengas */}
          <div className="relative z-20 max-w-7xl mx-auto h-full px-5 sm:px-10 lg:px-16 flex items-end md:items-center pb-8 sm:pb-12 md:pb-0">
            <div className="max-w-xl text-white space-y-2 sm:space-y-4">
              {/* Top Subtitle - Hidden on mobile as requested */}
              <p className="hidden md:block font-serif-luxury tracking-[0.25em] sm:tracking-[0.35em] text-[11px] sm:text-sm text-amber-200 uppercase font-semibold">
                {slide.subtitle}
              </p>

              {/* Huge Serif Headline with BOLD Handwritten Script Highlight */}
              <div className="space-y-0">
                <h1 className="font-serif-luxury text-3xl sm:text-6xl lg:text-7xl font-bold tracking-[0.1em] sm:tracking-[0.12em] uppercase text-white leading-tight drop-shadow-md">
                  {slide.headingPrefix}
                </h1>
                <span className="font-script text-5xl sm:text-8xl lg:text-9xl text-amber-300 block -mt-2 sm:-mt-5 font-bold tracking-normal drop-shadow-2xl">
                  {slide.headingHighlight}
                </span>
              </div>

              {/* Hinglish Touch Taglines */}
              <div className="space-y-1 sm:space-y-1.5 pt-1">
                <p className="font-serif-luxury tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm text-stone-200 font-bold uppercase">
                  {slide.tagline}
                </p>
                <p className="text-xs sm:text-sm text-stone-300 font-medium line-clamp-2">
                  {slide.subtagline}
                </p>
              </div>

              {/* Action Buttons: Sleek, compact and elegant on mobile without overpowering the outfit */}
              <div className="flex items-center gap-2.5 sm:gap-4 pt-2 sm:pt-4">
                <Link
                  href={slide.ctaLink}
                  className="inline-flex items-center justify-center gap-1.5 bg-[#8b1828]/95 hover:bg-[#8b1828] text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-7 rounded-full text-[11px] sm:text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 shrink-0"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </Link>

                <button
                  onClick={onOpenModal}
                  className="inline-flex items-center justify-center gap-1.5 bg-black/40 hover:bg-black/60 text-stone-200 hover:text-white backdrop-blur-md border border-white/20 font-medium py-2.5 sm:py-3 px-3.5 sm:px-6 rounded-full text-[11px] sm:text-xs uppercase tracking-wider transition-all active:scale-95"
                >
                  <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />
                  <span className="hidden xs:inline sm:inline">Book</span>
                  <span>Trial</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Desktop-Only Navigation Arrows (Hidden on Mobile/Phone) */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/30 hover:bg-black/60 text-white border border-white/20 backdrop-blur-md items-center justify-center transition-all hover:scale-110"
        aria-label="Previous Banner"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/30 hover:bg-black/60 text-white border border-white/20 backdrop-blur-md items-center justify-center transition-all hover:scale-110"
        aria-label="Next Banner"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Modern Capsule Pill Pagination Indicator in Top Right Corner */}
      <div className="absolute top-6 sm:top-8 right-5 sm:right-10 z-30 flex items-center">
        <div className="bg-black/50 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-lg">
          {CREATIVE_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full h-1.5 ${
                i === current ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
