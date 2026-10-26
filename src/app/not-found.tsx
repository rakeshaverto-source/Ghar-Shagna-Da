import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Home, MessageCircle, ArrowRight } from 'lucide-react';
import { CATEGORIES, SITE_CONFIG } from '@/data/products';
import { categoryPath } from '@/lib/categoryRoutes';

export const metadata: Metadata = {
  title: 'Page Not Found | Ghar Shagna Da',
  description: 'The page you are looking for has moved or no longer exists. Explore bridal lehengas, sherwanis and wedding outfits on rent at Ghar Shagna Da.',
  robots: { index: false, follow: true },
};

// Popular collections offered as a way back into the catalog
const SUGGESTED_IDS = ['bridal-lehenga', 'sherwani', 'gown', 'indo-western'];

export default function NotFound() {
  const suggestions = SUGGESTED_IDS.map((id) => CATEGORIES.find((c) => c.id === id)).filter(
    (c): c is (typeof CATEGORIES)[number] => Boolean(c)
  );
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Hello Ghar Shagna Da! I was looking for an outfit on your website but the page was not found. Can you help me?'
  )}`;

  return (
    <div className="bg-[#FAF8F5] pt-32 sm:pt-40 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Message */}
        <section className="text-center space-y-5">
          <span className="font-script text-3xl sm:text-4xl text-[#8b1828]">Oops, you seem to be lost!</span>

          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-amber-300" />
            <h1 className="font-serif-luxury text-7xl sm:text-9xl font-bold text-stone-900 leading-none tracking-tight">
              4<span className="text-[#8b1828]">0</span>4
            </h1>
            <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-amber-300" />
          </div>

          <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900">
            This page has slipped away like a dupatta in the wind
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
            The outfit or page you are looking for may have been rented out, renamed or moved. Don&apos;t worry,
            your perfect wedding look is still waiting for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#8b1828] via-[#a31d32] to-[#8b1828] hover:from-[#721320] hover:to-[#721320] text-white font-semibold py-3 px-7 rounded-xl text-sm shadow-[0_8px_20px_rgba(139,24,40,0.3)] transition-all"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              href="/catalog"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-stone-300 bg-white text-stone-800 hover:border-[#8b1828] hover:text-[#8b1828] font-semibold py-3 px-7 rounded-xl text-sm transition-all"
            >
              Browse All Outfits
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold py-3 px-7 rounded-xl text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Ask on WhatsApp
            </a>
          </div>
        </section>

        {/* Popular collections */}
        {suggestions.length > 0 && (
          <section className="mt-16 sm:mt-20 space-y-6">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b1828]">Popular Collections</p>
              <p className="font-serif-luxury text-lg sm:text-xl font-bold text-stone-900 mt-1">
                Maybe you were looking for one of these
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {suggestions.map((cat) => (
                <Link
                  key={cat.id}
                  href={categoryPath(cat.slug)}
                  className={`group relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b ${cat.bgGradient} border border-[#EBE3D7] shadow-sm hover:shadow-xl transition-all`}
                >
                  <Image
                    src={cat.image}
                    alt={`${cat.title} on rent`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-12 pb-4 px-4 text-center">
                    <p className="font-script text-lg text-amber-200 leading-none">{cat.handwrittenSubtitle}</p>
                    <p className="font-serif-luxury text-sm sm:text-base font-bold text-white mt-1">{cat.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
