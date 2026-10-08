'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: string;
  image: string;
  title: string;
  category: string;
  price: string;
  duration: string;
  highlight: string;
  badge: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 'slide-1',
    image: '/hero-lehenga.jpg',
    title: 'Crimson Velvet Zardozi Lehenga',
    category: 'Bridal Couture',
    price: '₹8,999',
    duration: '3-4 Days',
    highlight: 'Handcrafted Zardozi & Dual Dupatta',
    badge: 'Bridal Special',
  },
  {
    id: 'slide-2',
    image: '/hero-sherwani.jpg',
    title: 'Maharaja Ivory Tone-on-Tone Sherwani',
    category: 'Groom Wear',
    price: '₹6,999',
    duration: '3-4 Days',
    highlight: 'Lucknowi Chikankari & Royal Stole',
    badge: 'Groom Collection',
  },
  {
    id: 'slide-3',
    image: '/hero-gown.jpg',
    title: 'Pastel Pearl Trail Reception Gown',
    category: 'Wedding Dresses',
    price: '₹4,499',
    duration: '3 Days',
    highlight: 'Blush Tulle & Hand-embroidered Pearls',
    badge: 'Reception Gown',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto-play interval every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const activeSlide = HERO_SLIDES[current];

  return (
    <div className="relative w-full max-w-sm sm:max-w-md h-[520px] sm:h-[620px] flex items-end justify-center select-none group">
      {/* Background Soft Glow Ring */}
      <div className="absolute w-80 sm:w-[420px] h-80 sm:h-[420px] rounded-full bg-gradient-to-tr from-[#8b1828]/10 via-[#c68a4c]/10 to-transparent blur-3xl -z-10" />

      {/* Slide Image with Smooth Crossfade */}
      <div className="relative w-full h-full">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === current ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-95 pointer-events-none'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={idx === 0}
              className="object-contain object-bottom drop-shadow-2xl"
            />
          </div>
        ))}
      </div>

      {/* Pure Image Carousel without any overlay text boxes */}

      {/* Navigation Controls: Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-stone-800 border border-stone-200 flex items-center justify-center shadow-md transition-all hover:scale-110 opacity-70 group-hover:opacity-100"
        aria-label="Previous Outfit"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-stone-800 border border-stone-200 flex items-center justify-center shadow-md transition-all hover:scale-110 opacity-70 group-hover:opacity-100"
        aria-label="Next Outfit"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Slide Indicator Dots */}
      <div className="absolute -bottom-8 inset-x-0 flex items-center justify-center gap-2 z-20">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'w-6 h-2 bg-[#8b1828]'
                : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
