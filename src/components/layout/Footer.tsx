import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, MessageCircle, Heart, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG, CATEGORIES } from '@/data/products';

export default function Footer() {
  return (
    <footer className="bg-[#faf7f2] text-stone-700 border-t border-[#f0eae1] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand info with Logo.png */}
          <div className="space-y-4">
            <div className="relative w-44 h-16">
              <Image
                src="/Logo.png"
                alt="घर शगनां दा"
                fill
                sizes="180px"
                className="object-contain object-left"
              />
            </div>
            <p className="font-script text-2xl text-[#8b1828]">
              Cherishing Your Special Moments
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              Complete Store of All Wedding Accessories & Outfits on Rent. We provide sanitized, designer bridal lehengas and groom wear with custom alterations at budget-friendly rental rates.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#8b1828] bg-rose-50 px-3 py-1 rounded-full border border-rose-100 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Sanitized & Custom Altered
              </span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h3 className="font-serif-luxury text-base font-bold text-stone-900 mb-4 tracking-wide uppercase">
              Rentals Catalog
            </h3>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-[#8b1828] transition-colors flex items-center justify-between"
                  >
                    <span>{cat.title}</span>
                    <span className="font-script text-sm text-[#c68a4c]">{cat.handwrittenSubtitle}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/catalog"
                  className="hover:text-[#8b1828] text-[#8b1828] font-semibold transition-colors"
                >
                  View All Outfits →
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="font-serif-luxury text-base font-bold text-stone-900 mb-4 tracking-wide uppercase">
              Customer Information
            </h3>
            <ul className="space-y-2.5 text-sm text-stone-600">
              <li>
                <Link href="/how-rental-works" className="hover:text-[#8b1828] transition-colors">
                  How Rental Works (Process)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#8b1828] transition-colors">
                  Book A Trial Appointment
                </Link>
              </li>
              <li className="pt-2 text-xs text-stone-500">
                * All outfits include standard 3-4 days rental periods with complementary custom alterations.
              </li>
            </ul>
          </div>

          {/* Store Address & Contact */}
          <div>
            <h3 className="font-serif-luxury text-base font-bold text-stone-900 mb-4 tracking-wide uppercase">
              Contact & Studio
            </h3>
            <div className="space-y-3 text-sm text-stone-600">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8b1828] shrink-0 mt-1" />
                <span>{SITE_CONFIG.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#8b1828] shrink-0" />
                <span>{SITE_CONFIG.phone}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8b1828] shrink-0" />
                <span>{SITE_CONFIG.email}</span>
              </p>
            </div>

            <div className="mt-5">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Ghar Shagna Da team, I want to inquire about renting wedding dresses.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-2.5 px-4 rounded-xl text-xs font-semibold transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Query</span>
              </a>
            </div>
          </div>
        </div>

        {/* SEO Keywords section */}
        <div className="border-t border-stone-200/80 pt-6 pb-6 text-xs text-stone-500 leading-relaxed">
          <p className="font-semibold text-stone-700 mb-1">Top Rental Searches:</p>
          <p>
            Bridal Lehenga on Rent • Wedding Dresses on Rent • Royal Groom Sherwani Rental • Anand Karaj Outfits • Sangeet Anarkali Suits • Jaggo Gowns • Haldi Shararas • Ghar Shagna Da Wedding Rentals Punjab.
          </p>
        </div>

        <div className="border-t border-stone-200/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Ghar Shagna Da. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" /> for your celebration
          </p>
        </div>
      </div>
    </footer>
  );
}
