'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, MessageCircle, Shield } from 'lucide-react';
import { SITE_CONFIG } from '@/data/products';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#f0eae1] transition-all duration-200">
      {/* Top continuous ribbon marquee ticker */}
      <div className="bg-[#8b1828] text-white text-xs py-2 overflow-hidden border-b border-[#70121f]">
        <div className="animate-marquee items-center gap-10 whitespace-nowrap text-[12px] font-medium tracking-wider">
          <div className="flex items-center gap-8">
            <span>Wedding Season Bookings Open • Luxury Bridal Lehengas on Rent</span>
            <span className="text-amber-300/60">•</span>
            <span>Complimentary Custom Alterations & Fitting Trials</span>
            <span className="text-amber-300/60">•</span>
            <span>Royal Groom Sherwanis & Wedding Dresses on Rent</span>
            <span className="text-amber-300/60">•</span>
            <span>100% Hospital-Grade Sanitized & Doorstep Packaging</span>
            <span className="text-amber-300/60">•</span>
          </div>

          {/* Duplicate set for seamless continuous loop */}
          <div className="flex items-center gap-8">
            <span>Wedding Season Bookings Open • Luxury Bridal Lehengas on Rent</span>
            <span className="text-amber-300/60">•</span>
            <span>Complimentary Custom Alterations & Fitting Trials</span>
            <span className="text-amber-300/60">•</span>
            <span>Royal Groom Sherwanis & Wedding Dresses on Rent</span>
            <span className="text-amber-300/60">•</span>
            <span>100% Hospital-Grade Sanitized & Doorstep Packaging</span>
            <span className="text-amber-300/60">•</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo with official user Logo.png */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-28 xs:w-32 sm:w-44 h-11 sm:h-14 transition-transform group-hover:scale-105">
              <Image
                src="/Logo.png"
                alt="घर शगनां दा - Complete Store of All Wedding Accessories"
                fill
                priority
                sizes="(max-width: 640px) 130px, 180px"
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-stone-700">
            <Link
              href="/"
              className="hover:text-[#8b1828] transition-colors font-medium tracking-wide"
            >
              Home
            </Link>
            <Link
              href="/category/bridal-lehengas"
              className="hover:text-[#8b1828] transition-colors"
            >
              Bridal Lehengas
            </Link>
            <Link
              href="/category/wedding-dresses"
              className="hover:text-[#8b1828] transition-colors"
            >
              Wedding Dresses
            </Link>
            <Link
              href="/category/sherwanis"
              className="hover:text-[#8b1828] transition-colors"
            >
              Sherwanis
            </Link>
            <Link
              href="/catalog"
              className="hover:text-[#8b1828] transition-colors"
            >
              All Outfits
            </Link>
            <Link
              href="/how-rental-works"
              className="hover:text-[#8b1828] transition-colors"
            >
              How It Works
            </Link>
          </nav>

          {/* Action Callouts */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello Ghar Shagna Da team, I want to inquire about renting wedding wear.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-sm transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Query</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 border border-[#8b1828] text-[#8b1828] hover:bg-[#8b1828] hover:text-white px-4 py-2.5 rounded-full text-xs font-semibold transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Book Trial</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello Ghar Shagna Da, I want to inquire about renting wedding dresses.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white p-2 rounded-full shadow"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-[#8b1828]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-6 space-y-4 shadow-xl">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-800 font-medium text-base hover:text-[#8b1828]"
          >
            Home
          </Link>
          <Link
            href="/category/bridal-lehengas"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-800 font-medium text-base hover:text-[#8b1828]"
          >
            Bridal Lehengas
          </Link>
          <Link
            href="/category/wedding-dresses"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-800 font-medium text-base hover:text-[#8b1828]"
          >
            Wedding Dresses & Gowns
          </Link>
          <Link
            href="/category/sherwanis"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-800 font-medium text-base hover:text-[#8b1828]"
          >
            Groom Sherwanis
          </Link>
          <Link
            href="/catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-800 font-medium text-base hover:text-[#8b1828]"
          >
            Browse All Outfits
          </Link>
          <Link
            href="/how-rental-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-800 font-medium text-base hover:text-[#8b1828]"
          >
            How Rental Works
          </Link>
          <div className="pt-2 border-t border-stone-100 flex items-center justify-end">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-[#8b1828] font-bold"
            >
              Contact Us →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
