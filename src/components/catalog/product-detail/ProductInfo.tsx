'use client';

import React from 'react';
import { Product, SITE_CONFIG } from '@/data/products';
import {
  MessageCircle,
  Calendar,
  ShieldCheck,
  Scissors,
  Clock,
  Share2,
  Check,
} from 'lucide-react';

interface ProductInfoProps {
  product: Product;
  copied: boolean;
  onShare: () => void;
  onOpenBookingModal: () => void;
}

export default function ProductInfo({
  product,
  copied,
  onShare,
  onOpenBookingModal,
}: ProductInfoProps) {
  const whatsappMessage = encodeURIComponent(
    `Hello Ghar Shagna Da! I am interested in renting:
"${product.title}"
Link: ${SITE_CONFIG.domain}/product/${product.slug}
Please let me know if this is available for my wedding date.`
  );

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="lg:col-span-7 space-y-6">
      {/* Title & Category Header */}
      <div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs uppercase tracking-widest text-[#8b1828] font-bold bg-rose-50 px-3 py-1 rounded-full border border-rose-200/60">
            {product.categoryLabel}
          </span>
          <button
            onClick={onShare}
            className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Share'}</span>
          </button>
        </div>

        {product.subtitle && (
          <p className="font-script text-3xl font-bold text-[#8b1828] mt-2 block drop-shadow-sm">
            {product.subtitle}
          </p>
        )}

        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
          {product.title}
        </h1>
      </div>

      {/* Booking & Rental Policy Box */}
      <div className="bg-[#faf8f5] border border-stone-200/80 rounded-2xl p-6 space-y-2">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xs text-stone-500 uppercase tracking-wider block font-medium">Rental Availability</span>
            <span className="font-serif-luxury text-2xl font-bold text-[#8b1828]">
              Available on Rent
            </span>
            <span className="text-xs text-stone-600 ml-2">({product.rentalDays} standard booking)</span>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Custom Alterations Free
          </span>
        </div>
        <p className="text-xs text-stone-500 pt-1">
          * Send a quick WhatsApp query or book a fitting appointment for custom rental package & dates.
        </p>
      </div>

      {/* Outfit Specs */}
      <div className="grid grid-cols-2 gap-3 text-xs bg-white p-4 rounded-2xl border border-stone-200">
        <div>
          <span className="text-stone-400 block uppercase font-medium text-[10px]">Fabric</span>
          <span className="font-semibold text-stone-900">{product.fabric}</span>
        </div>
        <div>
          <span className="text-stone-400 block uppercase font-medium text-[10px]">Embroidery</span>
          <span className="font-semibold text-stone-900">{product.embroidery}</span>
        </div>
        <div>
          <span className="text-stone-400 block uppercase font-medium text-[10px]">Color</span>
          <span className="font-semibold text-stone-900">{product.color}</span>
        </div>
        <div>
          <span className="text-stone-400 block uppercase font-medium text-[10px]">Ideal Occasion</span>
          <span className="font-semibold text-stone-900">{product.occasion}</span>
        </div>
      </div>

      {/* Action CTAs */}
      <div className="space-y-3 pt-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 px-6 rounded-2xl text-sm transition-all shadow-md hover:scale-[1.02] cursor-pointer"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Inquire on WhatsApp (Instant Response)</span>
        </a>

        <button
          onClick={onOpenBookingModal}
          className="w-full inline-flex items-center justify-center gap-2 border-2 border-stone-800 text-stone-900 hover:bg-stone-900 hover:text-white font-semibold py-3.5 px-6 rounded-2xl text-sm transition-all cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#c68a4c]" />
          <span>Book Fitting Trial / Reserve Date</span>
        </button>
      </div>

      {/* Assurances */}
      <div className="border-t border-stone-200 pt-4 space-y-2 text-xs text-stone-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#8b1828] shrink-0" />
          <span>Hygienic steam sterilization and dry-cleaning included.</span>
        </div>
        <div className="flex items-center gap-2">
          <Scissors className="w-4 h-4 text-[#8b1828] shrink-0" />
          <span>Complimentary alterations for blouse & waist to your exact body fit.</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#8b1828] shrink-0" />
          <span>Standard {product.rentalDays} booking. Extended period on request.</span>
        </div>
      </div>

      {/* Description & Inclusions */}
      <div className="space-y-4 pt-4 border-t border-stone-200">
        <h3 className="font-serif-luxury text-base font-bold text-stone-900">Outfit Details</h3>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
          {product.description}
        </p>

        <h4 className="font-semibold text-xs text-stone-900 pt-2 uppercase tracking-wider">What is Included:</h4>
        <ul className="space-y-1.5 text-xs text-stone-600">
          {product.includes.map((feat, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#8b1828] font-bold">•</span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
