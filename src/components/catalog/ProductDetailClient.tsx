'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MessageCircle, 
  Calendar, 
  ShieldCheck, 
  Scissors, 
  Clock, 
  Sparkles, 
  Share2, 
  Check, 
  ChevronRight 
} from 'lucide-react';
import { Product, SITE_CONFIG } from '@/data/products';
import QueryModal from '@/components/ui/QueryModal';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Hello Ghar Shagna Da! I am interested in renting:
"${product.title}" (${product.rentalPrice})
Link: ${SITE_CONFIG.domain}/product/${product.slug}
Please let me know if this is available for my wedding date.`
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Rent ${product.title} at Ghar Shagna Da`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" className="hover:text-[#8b1828]">
          Home
        </Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-[#8b1828]">
          Catalog
        </Link>
        <span>/</span>
        <Link href={`/category/${product.category}`} className="hover:text-[#8b1828]">
          {product.categoryLabel}
        </Link>
        <span>/</span>
        <span className="text-[#8b1828] font-semibold truncate max-w-[200px] sm:max-w-none">
          {product.title}
        </span>
      </nav>

      {/* Main Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Gallery / Left (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden border border-[#f0eae1] bg-stone-100 shadow-lg">
            <Image
              src={product.images[selectedImage]}
              alt={product.title}
              fill
              priority
              className="object-cover object-top transition-all duration-300"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === idx
                      ? 'border-[#8b1828] scale-105 shadow'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Preview ${idx + 1}`}
                    fill
                    className="object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content / Right (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-widest text-[#8b1828] font-bold bg-rose-50 px-3 py-1 rounded-full border border-rose-200/60">
                {product.categoryLabel}
              </span>
              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>
            </div>

            {product.subtitle && (
              <p className="font-script text-2xl text-[#c68a4c] mt-2 block">
                {product.subtitle}
              </p>
            )}

            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
              {product.title}
            </h1>
          </div>

          {/* Booking & Rental Policy Box (No Price Shown) */}
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

          {/* Specs */}
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

          {/* CTAs */}
          <div className="space-y-3 pt-2">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 px-6 rounded-2xl text-sm transition-all shadow-md hover:scale-[1.02]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Inquire on WhatsApp (Instant Response)</span>
            </a>

            <button
              onClick={() => setModalOpen(true)}
              className="w-full inline-flex items-center justify-center gap-2 border-2 border-stone-800 text-stone-900 hover:bg-stone-900 hover:text-white font-semibold py-3.5 px-6 rounded-2xl text-sm transition-all"
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

          {/* Description */}
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
      </div>

      <QueryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productTitle={product.title}
        productPrice={product.rentalPrice}
      />
    </div>
  );
}
