'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Eye } from 'lucide-react';
import { Product, SITE_CONFIG } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hello Ghar Shagna Da! I would like to inquire about renting "${product.title}" (${product.rentalPrice}). Could you please check availability for my event date?`
  )}`;

  return (
    <article className="group bg-white border border-[#f0eae1] rounded-2xl overflow-hidden card-shadow card-shadow-hover transition-all duration-300 flex flex-col justify-between">
      {/* Product Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
        <Image
          src={product.images[0]}
          alt={`${product.title} on rent - Ghar Shagna Da`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          priority={product.isTrending}
        />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-stone-200/80 text-stone-800 text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
          {product.categoryLabel}
        </div>

        {/* Trending Badge */}
        {product.isTrending && (
          <div className="absolute top-3 right-3 bg-[#8b1828] text-white text-[11px] font-medium px-2.5 py-1 rounded-full shadow">
            <span>Popular</span>
          </div>
        )}

        {/* Rental Status banner on image bottom */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
          <div className="flex items-baseline justify-between text-white">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-amber-200 font-semibold block">
                Booking Status
              </span>
              <span className="text-sm font-bold font-serif-luxury text-white">Available on Rent</span>
            </div>
            <span className="text-[11px] text-stone-200 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
              {product.rentalDays}
            </span>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {product.subtitle && (
            <p className="font-script text-lg text-[#c68a4c] leading-tight">
              {product.subtitle}
            </p>
          )}
          <h3 className="font-serif-luxury text-base font-bold text-stone-900 group-hover:text-[#8b1828] transition-colors line-clamp-1 mt-0.5">
            {product.title}
          </h3>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-stone-600 bg-[#faf8f5] p-2.5 rounded-xl border border-stone-200/60">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-medium">Fabric:</span>
              <span className="truncate block font-semibold text-stone-800">{product.fabric}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-medium">Occasion:</span>
              <span className="truncate block font-semibold text-stone-800">{product.occasion}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Link
            href={`/product/${product.slug}`}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-stone-200 text-stone-800 hover:border-[#8b1828] hover:text-[#8b1828] text-xs font-semibold transition-all bg-white"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold shadow-sm transition-all hover:scale-105"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Enquire</span>
          </a>
        </div>
      </div>
    </article>
  );
}
