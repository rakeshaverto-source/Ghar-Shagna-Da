'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Camera,
  Heart,
  Sparkles,
  MapPin,
  Calendar,
  Eye,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
  PhoneCall,
} from 'lucide-react';
import { SITE_CONFIG } from '@/data/products';

interface GalleryItem {
  _id: string;
  title: string;
  altText?: string;
  category: string;
  imageUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  productSlug?: string;
  brideName?: string;
  location?: string;
  isFeatured?: boolean;
  order: number;
}

const CATEGORIES = [
  'All',
  'Bridal Lehengas',
  'Groom Sherwanis',
  'Wedding Gowns',
  'Real Brides & Grooms',
  'Haldi & Sangeet',
];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Fetch gallery items from MongoDB API
  useEffect(() => {
    async function loadGallery() {
      setLoading(true);
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        if (data.items) {
          setItems(data.items);
        }
      } catch (err) {
        console.error('Failed to load gallery', err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  const filteredItems = items.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  // Lightbox navigation
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 pt-24 sm:pt-28 pb-20">
      {/* 👑 HERO SHOWCASE HEADER */}
      <section className="relative overflow-hidden mb-12 pb-2 text-center">
        {/* Subtle decorative royal ambient lights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-amber-500/10 via-[#8b1828]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-stone-900 tracking-tight leading-tight">
            Cherished Bridal Stories & <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#8b1828] font-serif">Royal Wedding Moments</span>
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto font-normal leading-relaxed">
            Real couples who chose Ghar Shagna Da for their wedding celebrations across Punjab and worldwide.
          </p>

          {/* Luxury Gold Divider Accent */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#8b1828]/30" />
            <span className="text-[#8b1828] text-xs">✦</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#8b1828]/30" />
          </div>
        </div>
      </section>

      {/* 🖼️ PHOTO GALLERY - DYNAMIC MASONRY (CHOTI-BADI IMAGES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-12 h-12 rounded-full border-3 border-[#8b1828] border-t-transparent animate-spin mx-auto mb-4" />
            <p className="text-sm font-medium text-stone-500 tracking-wide">Loading royal photo gallery...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-stone-300 max-w-md mx-auto shadow-xs">
            <Camera className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-stone-800">No photos found</h3>
            <p className="text-xs text-stone-500 mt-1">There are currently no photos in the gallery.</p>
          </div>
        ) : (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6 [column-fill:_balance]">
            {filteredItems.map((item, index) => {
              // Har photo ka height pattern: koi badi (tall portrait), koi medium, koi choti (square/compact)
              const heightClass =
                index % 4 === 0
                  ? 'aspect-2/3'      // Badi / Extra Tall (Featured)
                  : index % 3 === 0
                  ? 'aspect-4/5'      // Medium Tall
                  : index % 2 === 0
                  ? 'aspect-1/1'      // Choti / Square
                  : 'aspect-3/4';     // Standard Portrait

              return (
                <div
                  key={item._id}
                  onClick={() => openLightbox(index)}
                  className="break-inside-avoid group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white p-2 sm:p-2.5 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-[#EBE3D7]/80 hover:border-[#8b1828]/40 hover:-translate-y-1.5 flex flex-col"
                >
                  {/* Photo Frame with varying height */}
                  <div className={`relative w-full ${heightClass} rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100`}>
                    <Image
                      src={item.imageUrl}
                      alt={item.altText || item.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Gradient shadow overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 text-white">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 tracking-wider">
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Photo</span>
                      </span>
                    </div>

                    {/* Top-Right Quick Expand Icon on Hover */}
                    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center shadow-md border border-white/20 hover:bg-[#8b1828] transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Minimalist Editorial Title under photo */}
                  <div className="pt-2.5 pb-1 px-1 flex items-center justify-between gap-2">
                    <h3 className="font-serif text-xs sm:text-sm font-semibold text-stone-900 group-hover:text-[#8b1828] transition-colors truncate">
                      {item.title}
                    </h3>
                    <span className="text-stone-300 group-hover:text-[#8b1828] transition-colors text-xs shrink-0">
                      ↗
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 💬 BOTTOM CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-br from-[#8b1828] to-[#5a0c18] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block mb-2">
              Book A Fitting Trial Appointment
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
              Loved a design from our royal gallery?
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 mt-2 leading-relaxed">
              Visit our store in Punjab or book an online video trial. We provide complete custom fitting alterations and sanitized doorstep delivery for your big day.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello Ghar Shagna Da, I saw your wedding gallery photos and want to inquire about renting an outfit.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-lg transition-transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>

            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 bg-white text-[#8b1828] hover:bg-stone-100 px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-lg transition-transform hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Catalog</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 🔎 FULL-SCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && activeItem && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none animate-fadeIn">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white z-20 pb-2 border-b border-white/10">
            <div>
              <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider block">
                {activeItem.category} • {lightboxIndex + 1} of {filteredItems.length}
              </span>
              <h2 className="font-serif text-base sm:text-lg font-bold">{activeItem.title}</h2>
            </div>

            <button
              onClick={closeLightbox}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Photo Center */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-[#8b1828] text-white transition-all hover:scale-110 shadow-lg"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-[#8b1828] text-white transition-all hover:scale-110 shadow-lg"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Full Image */}
            <div className="relative w-full h-full max-w-4xl max-h-[75vh] flex items-center justify-center">
              <Image
                src={activeItem.imageUrl}
                alt={activeItem.altText || activeItem.title}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </div>

          {/* Bottom Caption & WhatsApp Inquire */}
          <div className="bg-stone-950/80 rounded-2xl p-4 sm:p-5 border border-white/10 max-w-4xl mx-auto w-full z-20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              {activeItem.caption && (
                <p className="text-xs sm:text-sm text-stone-200 leading-snug">{activeItem.caption}</p>
              )}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-stone-400 mt-1.5">
                {activeItem.brideName && (
                  <span className="flex items-center gap-1 text-amber-300 font-medium">
                    <Heart className="w-3.5 h-3.5 fill-amber-300" />
                    <span>{activeItem.brideName}</span>
                  </span>
                )}
                {activeItem.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{activeItem.location}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Inquire on WhatsApp or View Outfit */}
            <div className="flex items-center gap-3 shrink-0">
              {activeItem.productSlug && (
                <Link
                  href={`/outfits/${activeItem.productSlug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white text-stone-900 hover:bg-stone-200 transition-colors"
                >
                  <span>View Outfit Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  `Hello Ghar Shagna Da! I saw this photo in your gallery: "${activeItem.title}" (${activeItem.brideName ? 'Bride: ' + activeItem.brideName : ''}). Is this outfit available for rent?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-md transition-transform hover:scale-105"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
