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
    <article className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(139,24,40,0.12)] hover:border-amber-300/60 transition-all duration-500 flex flex-col justify-between">
      {/* Product Image Section */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
        <Image
          src={product.images[0]}
          alt={`${product.title} on rent - Ghar Shagna Da`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
          priority={product.isTrending}
        />

        {/* Top Badges */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none">
          <span className="bg-stone-900/80 backdrop-blur-md text-amber-200 text-[10px] tracking-wider uppercase font-medium px-3 py-1 rounded-full border border-amber-300/30 shadow-sm">
            {product.categoryLabel}
          </span>
          {product.isTrending && (
            <span className="bg-gradient-to-r from-[#8b1828] to-[#6a111e] text-white text-[10px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full shadow-md border border-white/20">
              Popular Pick
            </span>
          )}
        </div>

        {/* Bottom Floating Booking Status Bar (No price shown) */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent pt-10 pb-3.5 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs uppercase tracking-wider font-medium text-amber-200">
                Available On Rent
              </span>
            </div>
            <span className="text-[10.5px] text-stone-200 bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 font-medium">
              {product.rentalDays}
            </span>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {product.subtitle && (
            <p className="font-script text-2xl font-bold text-[#8b1828] leading-snug drop-shadow-sm tracking-wide">
              {product.subtitle}
            </p>
          )}
          <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-stone-900 group-hover:text-[#8b1828] transition-colors line-clamp-1 mt-0.5 tracking-tight">
            {product.title}
          </h3>

          {/* Luxury Spec Strip */}
          <div className="mt-3 flex items-center justify-between gap-2.5 bg-gradient-to-r from-[#FAF8F5] via-[#FDFBF7] to-[#FAF8F5] px-3 py-2 rounded-xl border border-[#EDE4D8] shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="min-w-0 flex-1">
              <span className="text-[#968270] block text-[9px] uppercase tracking-[0.14em] font-semibold">Fabric</span>
              <span className="truncate block font-medium text-xs text-stone-900 pt-0.5" title={product.fabric}>{product.fabric}</span>
            </div>
            <div className="h-6 w-[1px] bg-[#E5D7C6]/80 flex-shrink-0" />
            <div className="min-w-0 flex-1 pl-1">
              <span className="text-[#968270] block text-[9px] uppercase tracking-[0.14em] font-semibold">Occasion</span>
              <span className="truncate block font-medium text-xs text-stone-900 pt-0.5" title={product.occasion}>{product.occasion}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <Link
            href={`/product/${product.slug}`}
            data-cursor-text="LOOK"
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-stone-300 text-stone-800 hover:border-[#8b1828] hover:bg-[#8b1828] hover:text-white text-xs font-semibold tracking-wide uppercase transition-all duration-300 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-text="CHAT"
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1da851] hover:from-[#20ba5a] hover:to-[#178f44] text-white text-xs font-semibold tracking-wide uppercase shadow-md shadow-emerald-500/10 transition-all duration-300 hover:shadow-lg"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Enquire</span>
          </a>
        </div>
      </div>
    </article>
  );
}
