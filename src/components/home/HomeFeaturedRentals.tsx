'use client';

import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/catalog/ProductCard';
import { ArrowRight } from 'lucide-react';

interface HomeFeaturedRentalsProps {
  products: any[];
}

export default function HomeFeaturedRentals({ products }: HomeFeaturedRentalsProps) {
  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <p className="font-script text-2xl sm:text-3xl text-[#8b1828]">Trending Now</p>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight">
            Featured Outfits on Rent
          </h2>
        </div>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8b1828] hover:underline"
        >
          <span>View Complete Collection</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
