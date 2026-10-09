'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageCircle, Shield } from 'lucide-react';
import { SITE_CONFIG } from '@/data/products';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdmin) {
    return null;
  }

  const isTransparent = isHome && !isScrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white border-transparent'
          : 'bg-white/95 backdrop-blur-md text-stone-900 border-b border-[#f0eae1] shadow-xs'
      }`}
    >
      {/* Top marquee ticker - Only visible when scrolled or on other pages so hero video is 100% clean */}
      <div className={`overflow-hidden text-xs py-1.5 sm:py-2 border-b bg-[#8b1828] text-white border-[#70121f] transition-all duration-300 ${
        isTransparent ? 'hidden' : 'block'
      }`}>
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
          {/* Logo - Pure & Clean, no artificial dark box */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-28 xs:w-32 sm:w-44 h-11 sm:h-14 transition-transform group-hover:scale-105">
              <Image
                src="/Logo.png"
                alt="घर शगनां दा - Complete Store of All Wedding Accessories"
                fill
                priority
                sizes="(max-width: 640px) 130px, 180px"
                className="object-contain object-left drop-shadow-md"
              />
            </div>
          </Link>

          {/* Desktop Navigation - Clean luxury typography */}
          <nav className={`hidden lg:flex items-center space-x-8 text-sm font-medium transition-colors ${
            isTransparent ? 'text-white drop-shadow-md' : 'text-stone-700'
          }`}>
            <Link
              href="/"
              className={`transition-colors font-semibold tracking-wide ${
                isTransparent ? 'text-amber-300 hover:text-white' : 'hover:text-[#8b1828]'
              }`}
            >
              Home
            </Link>
            <Link
              href="/category/bridal-lehengas"
              className={`transition-colors font-medium tracking-wide ${
                isTransparent ? 'hover:text-amber-300' : 'hover:text-[#8b1828]'
              }`}
            >
              Bridal Lehengas
            </Link>
            <Link
              href="/category/wedding-dresses"
              className={`transition-colors ${
                isTransparent ? 'hover:text-amber-300' : 'hover:text-[#8b1828]'
              }`}
            >
              Wedding Dresses
            </Link>
            <Link
              href="/category/sherwanis"
              className={`transition-colors ${
                isTransparent ? 'hover:text-amber-300' : 'hover:text-[#8b1828]'
              }`}
            >
              Sherwanis
            </Link>
            <Link
              href="/catalog"
              className={`transition-colors ${
                isTransparent ? 'hover:text-amber-300' : 'hover:text-[#8b1828]'
              }`}
            >
              All Outfits
            </Link>
            <Link
              href="/gallery"
              className={`transition-colors font-medium tracking-wide ${
                isTransparent ? 'hover:text-amber-300' : 'hover:text-[#8b1828]'
              }`}
            >
              Gallery
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
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold transition-all ${
                isTransparent
                  ? 'border border-amber-300/80 text-amber-200 bg-black/30 backdrop-blur-xs hover:bg-[#8b1828] hover:border-[#8b1828] hover:text-white'
                  : 'border border-[#8b1828] text-[#8b1828] hover:bg-[#8b1828] hover:text-white'
              }`}
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
              className={`p-2 transition-colors ${
                isTransparent ? 'text-white hover:text-amber-300' : 'text-stone-700 hover:text-[#8b1828]'
              }`}
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
            href="/gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-800 font-medium text-base hover:text-[#8b1828]"
          >
            Real Wedding Gallery
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
