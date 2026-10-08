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
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-stone-950 select-none touch-pan-y"
    >
      {/* Background Slides */}
      {CREATIVE_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* All Devices (Mobile + PC): High-End Cinematic Bridal Video - Full Height No Crop */}
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover object-[center_top] filter brightness-[0.96] contrast-[1.08] saturate-[1.05]"
            >
              <source src="/luxury_lehengas.mp4" type="video/mp4" />
              {/* Fallback to image if video not supported or slow connection */}
              <Image
                src={slide.desktopImage}
                alt={slide.headingPrefix}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-[center_top]"
              />
            </video>
          </div>

          {/* Cinematic Vignette Overlay - Lighter on the dress, deeper on left for text readability */}
          <div
            className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-stone-950/90 via-stone-950/60 via-35% to-transparent pointer-events-none"
          />

          {/* Slide Content Layer: Positioned cleanly with breathing room */}
          <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-10 lg:px-16 flex items-end md:items-center pb-10 sm:pb-16 md:pb-0 pt-20">
            <div className="w-full max-w-xl lg:max-w-2xl text-white space-y-3.5 sm:space-y-6">
              
              {/* Huge Serif Headline with BOLD Handwritten Script Highlight */}
              <div className="space-y-1">
                <h1 className="font-serif-luxury text-3xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[0.06em] uppercase text-white leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                  {slide.headingPrefix}
                </h1>
                <span className="font-script text-5xl sm:text-8xl lg:text-9xl xl:text-[10rem] text-[#f7c843] block -mt-2 sm:-mt-5 lg:-mt-7 font-bold tracking-normal drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)] filter brightness-110">
                  {slide.headingHighlight}
                </span>
              </div>

              {/* Hinglish Touch Taglines with Gold Decorative Accent */}
              <div className="space-y-1.5 sm:space-y-2 pt-1 border-l-2 border-amber-400/60 pl-3.5 sm:pl-5">
                <p className="font-serif-luxury tracking-[0.2em] sm:tracking-[0.25em] text-xs sm:text-sm lg:text-base text-amber-200 font-semibold uppercase">
                  {slide.tagline}
                </p>
                <p className="text-xs sm:text-base lg:text-lg text-stone-200 font-light max-w-lg leading-relaxed drop-shadow-md">
                  {slide.subtagline}
                </p>
              </div>

              {/* Action Buttons: Perfectly sized for mobile screen width */}
              <div className="flex items-center gap-2 sm:gap-5 pt-2 sm:pt-6 w-full max-w-full">
                <Link
                  href={slide.ctaLink}
                  className="group inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#8b1828] via-[#a01d30] to-[#73121f] hover:from-[#a01d30] hover:to-[#8b1828] text-white font-semibold py-2.5 sm:py-4 px-3 sm:px-8 rounded-full text-[11px] sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_8px_25px_rgba(139,24,40,0.5)] active:scale-95 shrink-0 whitespace-nowrap border border-white/20"
                >
                  <span className="hidden xs:inline">{slide.ctaText}</span>
                  <span className="inline xs:hidden">Explore Outfits</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <button
                  onClick={onOpenModal}
                  className="inline-flex items-center justify-center gap-1.5 bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-amber-300/50 hover:border-amber-300 font-medium py-2.5 sm:py-4 px-3 sm:px-7 rounded-full text-[11px] sm:text-sm uppercase tracking-wider transition-all duration-300 active:scale-95 shrink-0 whitespace-nowrap"
                >
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
                  <span className="whitespace-nowrap">Book Fitting Trial</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Subtle Luxury Scroll Down Indicator on PC */}
      <div className="hidden md:flex absolute bottom-8 right-12 z-30 flex-col items-center gap-2 text-white/70 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-amber-200/80">Scroll</span>
        <div className="w-5 h-9 rounded-full border border-white/30 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-amber-300 animate-bounce" />
        </div>
      </div>

      </section>
  );
}
