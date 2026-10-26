'use client';

import React, { useRef } from 'react';
import Image from 'next/image';

interface ProductImageGalleryProps {
  images: string[];
  title: string;
  selectedImage: number;
  setSelectedImage: (index: number) => void;
}

export default function ProductImageGallery({
  images,
  title,
  selectedImage,
  setSelectedImage,
}: ProductImageGalleryProps) {
  const slides = images.length > 0 ? images : ['/hero-lehenga.jpg'];
  const trackRef = useRef<HTMLDivElement>(null);

  // Swipe on touch screens: the main image is a snap-scrolling strip, so the photo follows the finger
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;
    const idx = Math.round(track.scrollLeft / track.clientWidth);
    if (idx !== selectedImage && idx >= 0 && idx < slides.length) setSelectedImage(idx);
  };

  const goTo = (idx: number) => {
    setSelectedImage(idx);
    const track = trackRef.current;
    if (track) track.scrollTo({ left: idx * track.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className="lg:col-span-5 space-y-4 max-w-sm sm:max-w-md mx-auto lg:mx-0 w-full lg:sticky lg:top-28">
      <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-lg border border-stone-200/90 bg-stone-100">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex h-full w-full overflow-x-auto snap-x snap-mandatory no-scrollbar overscroll-x-contain"
        >
          {slides.map((img, idx) => (
            <div key={idx} className="relative h-full w-full shrink-0 snap-center snap-always">
              <Image
                src={img}
                alt={idx === 0 ? title : `${title} - photo ${idx + 1}`}
                fill
                priority={idx === 0}
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          ))}
        </div>

        {slides.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/30 backdrop-blur-sm lg:hidden">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Show photo ${idx + 1}`}
                onClick={() => goTo(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  selectedImage === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex items-center gap-3 pt-1">
          {images.map((img, idx) => {
            const isActive = selectedImage === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => goTo(idx)}
                className={`relative w-20 h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                  isActive
                    ? 'ring-2 ring-[#8b1828] ring-offset-2 ring-offset-white shadow-md scale-[1.03]'
                    : 'opacity-60 hover:opacity-100 border border-stone-200 hover:border-stone-400'
                }`}
              >
                <Image
                  src={img}
                  alt={`Preview ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover object-top"
                />
                {isActive && (
                  <div className="absolute inset-0 bg-[#8b1828]/5 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
