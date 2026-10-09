'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';

interface RelatedProductsSectionProps {
  relatedProducts: Product[];
  currentCategory: string;
  categoryLabel: string;
}

export default function RelatedProductsSection({
  relatedProducts,
  currentCategory,
  categoryLabel,
}: RelatedProductsSectionProps) {
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <section className="border-t border-stone-200/90 pt-12 space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-script text-2xl text-[#8b1828]">More Options</p>
          <h2 className="font-cinzel text-2xl font-bold uppercase text-stone-900">
            You May Also Like
          </h2>
        </div>
        <Link
          href={`/category/${currentCategory}`}
          className="text-xs font-semibold uppercase tracking-wider text-[#8b1828] hover:underline"
        >
          View More In {categoryLabel} →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProducts.map((rel) => (
          <Link
            key={rel.id}
            href={`/product/${rel.slug}`}
            className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-amber-300 transition-all hover:shadow-lg flex flex-col"
          >
            <div className="relative aspect-[3/4] w-full bg-stone-100 overflow-hidden">
              <Image
                src={rel.images[0]}
                alt={rel.title}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                {rel.rentalDays}
              </div>
            </div>
            <div className="p-4 space-y-1">
              <p className="font-script text-sm text-[#8b1828]">{rel.subtitle}</p>
              <h3 className="font-serif-luxury text-sm font-bold text-stone-900 group-hover:text-[#8b1828] line-clamp-1">
                {rel.title}
              </h3>
              <p className="text-[11px] text-stone-500">{rel.occasion}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
