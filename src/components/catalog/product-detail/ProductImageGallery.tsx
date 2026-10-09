'use client';

import React from 'react';
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
  return (
    <div className="lg:col-span-5 space-y-4 max-w-sm sm:max-w-md mx-auto lg:mx-0 w-full lg:sticky lg:top-28">
      <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-lg border border-stone-200/90 bg-stone-100">
        <Image
          src={images[selectedImage] || images[0] || '/hero-lehenga.jpg'}
          alt={title}
          fill
          priority
          className="object-cover object-center transition-all duration-300"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
      </div>

      {images.length > 1 && (
        <div className="flex items-center gap-3 pt-1">
          {images.map((img, idx) => {
            const isActive = selectedImage === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(idx)}
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
