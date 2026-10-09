'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MessageCircle, 
  ArrowRight, 
  Calendar,
  ChevronRight,
  ChevronLeft,
  Star,
  CheckCircle,
  ChevronDown,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { CATEGORIES, OCCASION_CATEGORIES, INITIAL_PRODUCTS, SITE_CONFIG } from '@/data/products';
import ProductCard from '@/components/catalog/ProductCard';
import QueryModal from '@/components/ui/QueryModal';
import FullWidthCreativeHero from '@/components/ui/FullWidthCreativeHero';

// Authentic Bridal Customer Reviews
const HOMEPAGE_REVIEWS = [
  {
    id: 1,
    author: 'Sreelekshmi',
    city: 'Amritsar',
    date: '6/19/2026',
    rating: 5,
    comment: 'As good as in the picture! Handcrafted embroidery and rich crimson velvet dupatta was stunning. Truly made my Anand Karaj memorable.',
    tag: 'Verified Bride'
  },
  {
    id: 2,
    author: 'Mansi Sharma',
    city: 'Ludhiana',
    date: '5/12/2026',
    rating: 4,
    comment: 'Very pretty lehenga! Trial fitting was good. The blouse fit really well after slight sleeve adjustment. Got lots of compliments!',
    tag: 'Verified Bride'
  },
  {
    id: 3,
    author: 'Sujoy & Harleen',
    city: 'Chandigarh',
    date: '4/28/2026',
    rating: 5,
    comment: 'Excellent royal outfit. Fabric and zardozi look like pure couture. Very hygienic packaging and arrived right on time.',
    tag: 'Verified Client'
  },
  {
    id: 4,
    author: 'Swati Verma',
    city: 'Delhi',
    date: '4/15/2026',
    rating: 4,
    comment: 'Pretty outfit! Dry cleaning and hygiene was 10/10. Saved so much money renting instead of buying an expensive designer piece.',
    tag: 'Verified Bride'
  },
  {
    id: 5,
    author: 'Ragesree Kaur',
    city: 'Jalandhar',
    date: '3/20/2026',
    rating: 5,
    comment: 'The craftsmanship is so royal! Master ji ne blouse exact mere body shape te alter kar dita. Highly recommend Ghar Shagna Da 💕',
    tag: 'Verified Bride'
  },
  {
    id: 6,
    author: 'Jaspreet B.',
    city: 'Patiala',
    date: '2/18/2026',
    rating: 4,
    comment: 'Can-can flare is big and twirl photographs looked magical in natural sunlight. Loved the colour combination and dupatta.',
    tag: 'Verified Client'
  },
  {
    id: 7,
    author: 'Navneet Sandhu',
    city: 'Bathinda',
    date: '2/04/2026',
    rating: 5,
    comment: 'Fitting was completely custom! Even without visiting store, measurements were taken via WhatsApp video call. Timely doorstep delivery.',
    tag: 'Verified Bride'
  },
  {
    id: 8,
    author: 'Simran & Aman',
    city: 'Mohali',
    date: '1/10/2026',
    rating: 4,
    comment: 'Rented matching bride & groom outfits. Security deposit was refunded on time after returning the dresses. Overall a smooth experience!',
    tag: 'Verified Couple'
  }
];

// Curated Wedding Outfit Rental FAQs
const HOMEPAGE_FAQS = [
  {
    question: 'How many days before the wedding do I receive the outfit?',
    answer: 'We hand over or deliver your sanitized outfit 1 to 2 days prior to your main ceremony. This gives you complete peace of mind to try it on and pair your bridal jewellery in advance.'
  },
  {
    question: 'Are alterations and custom blouse fittings included in the rental?',
    answer: 'Yes, absolutely! Every outfit rental includes complimentary alterations by our master bridal tailors. We adjust the blouse bust, waist, sleeve length, and lehenga skirt height to your exact body measurements.'
  },
  {
    question: 'How does the security deposit and refund process work?',
    answer: 'A refundable security deposit is collected upon outfit handover. Once you return the outfit after your wedding, our team does a quick standard check and refunds 100% of your deposit immediately via UPI / bank transfer.'
  },
  {
    question: 'Do I need to wash or dry-clean the lehenga before returning it?',
    answer: 'No! You do not need to wash, iron, or dry-clean anything. We take care of complete hygienic steam sterilization and professional dry-cleaning in-house after every return.'
  },
  {
    question: 'Can I book an outfit in advance for peak wedding season?',
    answer: 'Yes, we recommend reserving your bridal lehenga or wedding dress 1 to 3 months in advance to lock your date, as premium bridal designs are booked quickly during auspicious wedding dates.'
  },
  {
    question: 'What if I am outside Ludhiana or living abroad (NRI brides)?',
    answer: 'We coordinate measurements via WhatsApp video calls and ship all across Punjab and India. NRI brides can book and reserve dates online and schedule fitting trials immediately upon arriving in Punjab.'
  }
];

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const reviewScrollRef = useRef<HTMLDivElement>(null);

  // Dynamic Testimonials from MongoDB
  const [reviewsList, setReviewsList] = useState<any[]>(HOMEPAGE_REVIEWS);

  // Dynamic Outfits from MongoDB / Cloudinary
  const [productsList, setProductsList] = useState<any[]>(INITIAL_PRODUCTS);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.products && data.products.length > 0) {
          const mapped = data.products.map((p: any) => ({
            id: p.id || p._id || p.slug,
            _id: p._id,
            slug: p.slug,
            title: p.title,
            subtitle: p.subtitle || '',
            category: p.categorySlug || p.category || 'bridal-lehengas',
            categoryLabel: p.category || 'Bridal Lehengas',
            rentalPrice: p.price || p.rentalPrice || '',
            securityDeposit: p.deposit || p.securityDeposit || '',
            originalPrice: p.originalValue || p.originalPrice || '',
            color: p.color || '',
            fabric: p.fabric || '',
            embroidery: p.work || p.embroidery || '',
            occasion: p.occasion || '',
            description: p.description || '',
            includes: p.includes || [],
            images: p.images && p.images.length > 0 ? p.images : ['/products/lehenga-maroon.png'],
            sizes: p.sizes || ['Custom Fit Available'],
            rentalDays: p.duration || p.rentalDays || '3 Days',
            isTrending: Boolean(p.featured ?? p.isTrending),
            reviews: p.reviews || [],
            metaDescription: p.description || '',
          }));
          setProductsList(mapped);
        }
      })
      .catch((err) => {
        console.error('Failed to load dynamic outfits', err);
      });
  }, []);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews && data.reviews.length > 0) {
          // Filter only featured reviews (or all if not specified)
          const featuredOnly = data.reviews.filter((r: any) => r.isFeatured !== false);
          setReviewsList(featuredOnly.length > 0 ? featuredOnly : data.reviews);
        }
      })
      .catch((err) => {
        console.error('Failed to load testimonials', err);
      });
  }, []);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollReviews = (direction: 'left' | 'right') => {
    if (reviewScrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      reviewScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Prioritize outfits marked featured/trending, fallback to first 6
  const featured = (() => {
    const featuredItems = productsList.filter((p) => p.isTrending);
    if (featuredItems.length > 0) {
      return featuredItems.slice(0, 6);
    }
    return productsList.slice(0, 6);
  })();

  return (
    <div className="space-y-6 sm:space-y-10 pb-10 sm:pb-14">
      {/* 1. EDITORIAL FULL-WIDTH CREATIVE HERO BANNER (NO MODELS, EDITORIAL TYPOGRAPHY & PILL CAPSULE) */}
      <FullWidthCreativeHero onOpenModal={() => setModalOpen(true)} />

      {/* 2. CURATED COLLECTIONS - CHOOSE YOUR WEDDING ATTIRE (ROUNDED ARCH ARCHITECTURAL CARDS) */}
      <section id="collections" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-10 scroll-mt-28">
        <div className="text-center space-y-0.5 sm:space-y-1.5 max-w-2xl mx-auto">
          <p className="font-script text-2xl xs:text-3xl sm:text-5xl text-[#8b1828] font-bold leading-none">
            Curated Collections
          </p>
          <h2 className="font-serif-luxury text-xl xs:text-2xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight whitespace-nowrap leading-snug">
            Choose Your Wedding Attire
          </h2>
          <div className="w-12 sm:w-20 h-0.5 bg-[#8b1828]/40 mx-auto rounded-full mt-1 sm:mt-2" />
        </div>

        {/* 6 Arch Cards Grid with Model Pop-Out Effect & Unique Backgrounds */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 pt-2 sm:pt-10">
          {OCCASION_CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative flex flex-col items-center select-none"
            >
              {/* Outer Wrapper with Aspect Ratio */}
              <div className="relative w-full aspect-[9/16]">
                {/* 1. Arch Frame Background (Warm Studio Lighting per occasion) */}
                <div
                  className={`absolute inset-0 rounded-t-[3.5rem] sm:rounded-t-[4.5rem] rounded-b-xl border-[1.5px] ${cat.archBorder} bg-gradient-to-b ${cat.bgGradient} overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300`}
                >
                  {/* Studio Central Sunlight Beam */}
                  <div className={`absolute -inset-x-10 top-0 h-4/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${cat.spotlight}`} />
                  
                  {/* Left Side Soft Tone for text legibility */}
                  <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black/25 via-black/10 to-transparent z-10 pointer-events-none" />

                  {/* Soft bottom ground reflection */}
                  <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />
                </div>

                {/* 2. Model Image: Pops out of top frame (-top-7 to -top-9, scale effect) */}
                <div className="absolute -top-7 sm:-top-9 inset-x-0 bottom-0 z-20 pointer-events-none flex items-end justify-center overflow-visible">
                  <div className="relative w-full h-[115%]">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      priority={idx < 3}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-contain object-bottom group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_14px_22px_rgba(0,0,0,0.35)]"
                    />
                  </div>
                </div>

                {/* 3. Category Title: Vertical text along the LEFT edge of each card */}
                <div className="absolute top-8 bottom-6 left-1.5 sm:left-3 z-30 flex items-center justify-center pointer-events-none">
                  <span
                    style={{ writingMode: 'vertical-rl' }}
                    className={`rotate-180 font-cinzel font-bold tracking-[0.32em] sm:tracking-[0.38em] text-white text-xs sm:text-sm lg:text-[15px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] group-hover:${cat.accentColor} group-hover:scale-105 transition-all duration-300 uppercase`}
                  >
                    {cat.title}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. EXPLORE OUR COLLECTIONS - SHOP BY CATEGORY (INTERACTIVE HORIZONTAL LUXURY PILLAR CAROUSEL) */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-10 scroll-mt-28">
        {/* Section Header with Left-Right Carousel Navigation Controls */}
        <div className="relative pb-1 sm:pb-3 flex flex-col items-center text-center">
          <div className="space-y-0.5 sm:space-y-1.5 max-w-2xl mx-auto">
            <p className="font-script text-2xl xs:text-3xl sm:text-5xl text-[#8b1828] font-bold leading-none">
              Explore Our Collections
            </p>
            <h2 className="font-cinzel text-lg xs:text-xl sm:text-3xl lg:text-4xl font-bold tracking-[0.08em] sm:tracking-[0.14em] uppercase text-stone-900 leading-snug">
              SHOP BY CATEGORY
            </h2>
            <div className="w-12 sm:w-20 h-0.5 bg-[#8b1828]/40 mx-auto rounded-full mt-1 sm:mt-2" />
          </div>

          {/* Desktop/Tablet Slider Arrow Controls */}
          <div className="hidden sm:flex items-center gap-2 mt-4 md:mt-0 md:absolute md:right-0 md:bottom-6">
            <button
              onClick={() => scrollCategories('left')}
              aria-label="Previous Category"
              className="w-10 h-10 rounded-full border border-stone-300 hover:border-[#8b1828] hover:bg-[#8b1828] hover:text-white text-stone-700 flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCategories('right')}
              aria-label="Next Category"
              className="w-10 h-10 rounded-full border border-stone-300 hover:border-[#8b1828] hover:bg-[#8b1828] hover:text-white text-stone-700 flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track (Swipeable on touch & smoothly scrollable) */}
        <div
          ref={categoryScrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-0 sm:pb-6 pt-6 sm:pt-10 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar touch-pan-x snap-x snap-mandatory"
        >
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative flex-none w-[260px] xs:w-[280px] sm:w-[320px] lg:w-[340px] aspect-[9/14] snap-start flex flex-col justify-end select-none"
            >
              {/* 1. Base Card Container (Rounded Pillar with Background Gradient) */}
              <div
                className={`absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-b ${cat.bgGradient || 'from-stone-900 to-stone-950'} border border-stone-200/90 shadow-lg group-hover:shadow-2xl group-hover:border-amber-400/90 transition-all duration-500`}
              >
                {/* Studio Spotlight Light Layer */}
                {cat.spotlight && (
                  <div className={`absolute -inset-x-10 top-0 h-3/4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${cat.spotlight} pointer-events-none`} />
                )}

                {/* Bottom Vignette for Crisp Text */}
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none z-10" />

                {/* Top Luxury Pill Tag */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-block bg-white/95 backdrop-blur-md text-[#8b1828] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md border border-stone-200/60">
                    On Rent
                  </span>
                </div>
              </div>

              {/* 2. Model Image: Butter-Smooth 3D Pop-Out using GPU-accelerated translate-y (Zero shake) */}
              <div className="absolute inset-0 z-15 pointer-events-none overflow-visible flex items-end justify-center">
                <div className="relative w-full h-[108%] -top-2 transition-transform duration-500 ease-out will-change-transform transform-gpu group-hover:-translate-y-5">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    priority={idx < 2}
                    sizes="(max-width: 640px) 280px, 340px"
                    className="object-contain object-bottom drop-shadow-[0_12px_22px_rgba(0,0,0,0.55)] group-hover:drop-shadow-[0_20px_35px_rgba(0,0,0,0.75)] transition-all duration-500"
                  />
                </div>
              </div>

              {/* 3. Card Content Information: Luxury Frosted Glass Tray for 100% Sharp Readability */}
              <div className="relative z-20 m-3 sm:m-4 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 space-y-1.5 text-white shadow-xl group-hover:border-amber-300/40 group-hover:bg-black/80 transition-all duration-300">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-amber-300/90 block">
                  {cat.handwrittenSubtitle}
                </span>
                <h3 className="font-cinzel text-lg sm:text-xl font-bold tracking-wide text-white group-hover:text-amber-200 transition-colors drop-shadow">
                  {cat.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-300 line-clamp-2 leading-relaxed">
                  {cat.tagline}
                </p>
                <div className="pt-1.5 flex items-center text-xs font-semibold text-amber-300 gap-1.5 group-hover:translate-x-1.5 transition-transform duration-300">
                  <span>Explore Designs</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED HANDPICKED RENTALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
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
            <span>View Complete Collection ({productsList.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. HOW THE RENTAL PROCESS WORKS (EXACT REFERENCE DESIGN) */}
      <section className="bg-[#FCFAF7] border-y border-[#F3EDE5] py-7 sm:py-9 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-1 max-w-2xl mx-auto">
            <p className="font-script text-2xl sm:text-3xl text-[#8b1828]">
              Effortless Journey
            </p>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] font-bold text-stone-900 tracking-tight leading-tight">
              How Outfit Rental Works
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light max-w-lg mx-auto pt-1">
              Simple 4 steps designed for zero stress and complete bridal perfection.
            </p>
          </div>

          {/* 4 Cards Grid with Responsive Layout & Desktop Connectors */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 items-stretch">
            
            {/* Step 01 */}
            <div className="relative flex">
              <div className="group w-full bg-white rounded-[24px] p-8 sm:p-9 border border-[#F6EBEA] shadow-[0_8px_30px_rgba(235,185,188,0.12)] hover:shadow-[0_14px_35px_rgba(200,120,130,0.18)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  {/* Top Row: Large Step Number + Elegant Line-Art Dress Icon with Sparkles */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-serif-luxury text-[34px] sm:text-[38px] font-bold text-[#E5A8A9] tracking-wide select-none leading-none block">
                        01
                      </span>
                      {/* Blush divider line below step number */}
                      <div className="w-9 h-[2px] bg-[#EBB4B6] rounded-full mt-3 mb-5" />
                    </div>
                    
                    {/* Circular Icon Area (Prominent & Luxury) */}
                    <div className="w-20 h-20 rounded-full bg-[#FAF0F0] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0 relative">
                      <svg className="w-11 h-11 text-[#A85860]" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        {/* Hanger / Dress Top */}
                        <path d="M16 6a2 2 0 0 1 2 2c0 .8-.5 1.5-1.2 1.8L20 12l-4 1-4-1 3.2-2.2A2 2 0 0 1 16 6z" />
                        <path d="M12 13l-4 13h16l-4-13" />
                        <path d="M14 13v13" />
                        <path d="M18 13v13" />
                        {/* Sparkles */}
                        <path d="M25 8l.5 1.5L27 10l-1.5.5L25 12l-.5-1.5L23 10l1.5-.5z" fill="currentColor" stroke="none" />
                        <path d="M7 16l.4 1.1L8.5 17.5l-1.1.4L7 19l-.4-1.1L5.5 17.5l1.1-.4z" fill="currentColor" stroke="none" />
                      </svg>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif-luxury text-xl sm:text-[22px] font-bold text-stone-900 tracking-tight mb-3 leading-snug">
                    Select &<br />Inquire
                  </h3>
                  <p className="text-[13px] text-stone-600 leading-relaxed font-normal">
                    Choose your lehenga, dress, or sherwani. Click Enquire to check availability for your wedding date on WhatsApp.
                  </p>
                </div>
              </div>

              {/* Desktop Curved Dotted Connector Arrow 01 -> 02 */}
              <div className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 w-8 z-10 pointer-events-none">
                <svg className="w-8 h-6 text-[#EBB4B6]" viewBox="0 0 32 24" fill="none">
                  <path d="M2 14 C 10 6, 20 22, 28 12" stroke="currentColor" strokeWidth="1.75" strokeDasharray="3 3.5" />
                  <path d="M23 8 L 29 12 L 24 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Step 02 */}
            <div className="relative flex">
              <div className="group w-full bg-white rounded-[24px] p-8 sm:p-9 border border-[#F6EBEA] shadow-[0_8px_30px_rgba(235,185,188,0.12)] hover:shadow-[0_14px_35px_rgba(200,120,130,0.18)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  {/* Top Row: Large Step Number + Measuring Tape Icon */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-serif-luxury text-[34px] sm:text-[38px] font-bold text-[#E5A8A9] tracking-wide select-none leading-none block">
                        02
                      </span>
                      {/* Blush divider line below step number */}
                      <div className="w-9 h-[2px] bg-[#EBB4B6] rounded-full mt-3 mb-5" />
                    </div>
                    
                    {/* Circular Icon Area (Prominent & Luxury) */}
                    <div className="w-20 h-20 rounded-full bg-[#FAF0F0] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0 relative">
                      <svg className="w-11 h-11 text-[#A85860]" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        {/* Tape Measure Roll */}
                        <ellipse cx="14" cy="16" rx="7" ry="5" />
                        <ellipse cx="14" cy="15" rx="4" ry="2.5" />
                        <path d="M14 21c4 0 11 0 13 0s1-2 1-3-1-3-3-3h-11" />
                        <line x1="18" y1="18" x2="18" y2="21" />
                        <line x1="21" y1="18" x2="21" y2="21" />
                        <line x1="24" y1="18" x2="24" y2="21" />
                        {/* Sparkles */}
                        <path d="M26 10l.5 1.5L28 12l-1.5.5L26 14l-.5-1.5L24 12l1.5-.5z" fill="currentColor" stroke="none" />
                      </svg>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif-luxury text-xl sm:text-[22px] font-bold text-stone-900 tracking-tight mb-3 leading-snug">
                    Custom<br />Fitting
                  </h3>
                  <p className="text-[13px] text-stone-600 leading-relaxed font-normal">
                    Visit our boutique or provide your body measurements. Our master tailors customize the blouse, sleeves, and skirt height.
                  </p>
                </div>
              </div>

              {/* Desktop Curved Dotted Connector Arrow 02 -> 03 */}
              <div className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 w-8 z-10 pointer-events-none">
                <svg className="w-8 h-6 text-[#EBB4B6]" viewBox="0 0 32 24" fill="none">
                  <path d="M2 14 C 10 6, 20 22, 28 12" stroke="currentColor" strokeWidth="1.75" strokeDasharray="3 3.5" />
                  <path d="M23 8 L 29 12 L 24 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Step 03 */}
            <div className="relative flex">
              <div className="group w-full bg-white rounded-[24px] p-8 sm:p-9 border border-[#F6EBEA] shadow-[0_8px_30px_rgba(235,185,188,0.12)] hover:shadow-[0_14px_35px_rgba(200,120,130,0.18)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  {/* Top Row: Large Step Number + Garment Bag Icon */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-serif-luxury text-[34px] sm:text-[38px] font-bold text-[#E5A8A9] tracking-wide select-none leading-none block">
                        03
                      </span>
                      {/* Blush divider line below step number */}
                      <div className="w-9 h-[2px] bg-[#EBB4B6] rounded-full mt-3 mb-5" />
                    </div>
                    
                    {/* Circular Icon Area (Prominent & Luxury) */}
                    <div className="w-20 h-20 rounded-full bg-[#FAF0F0] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0 relative">
                      <svg className="w-11 h-11 text-[#A85860]" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        {/* Hanger top */}
                        <path d="M16 6a2 2 0 0 1 2 2c0 .8-.5 1.5-1.2 1.8V11" />
                        {/* Garment Bag Outline */}
                        <path d="M11 11l5-1.5 5 1.5v14a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2V11z" />
                        <line x1="16" y1="11" x2="16" y2="27" />
                        {/* Sparkles */}
                        <path d="M24 14l.5 1.2L26 16l-1.5.5L24 18l-.5-1.5L22 16l1.5-.8z" fill="currentColor" stroke="none" />
                        <path d="M7 18l.4 1L9 19.5l-1.6.4L7 21l-.4-1.1L5 19.5l1.6-.4z" fill="currentColor" stroke="none" />
                      </svg>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif-luxury text-xl sm:text-[22px] font-bold text-stone-900 tracking-tight mb-3 leading-snug">
                    Sanitized<br />Pickup
                  </h3>
                  <p className="text-[13px] text-stone-600 leading-relaxed font-normal">
                    Receive the steam-sterilized outfit sealed in luxury garment packaging 1-2 days before your wedding ceremonies.
                  </p>
                </div>
              </div>

              {/* Desktop Curved Dotted Connector Arrow 03 -> 04 */}
              <div className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 w-8 z-10 pointer-events-none">
                <svg className="w-8 h-6 text-[#EBB4B6]" viewBox="0 0 32 24" fill="none">
                  <path d="M2 14 C 10 6, 20 22, 28 12" stroke="currentColor" strokeWidth="1.75" strokeDasharray="3 3.5" />
                  <path d="M23 8 L 29 12 L 24 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Step 04 */}
            <div className="relative flex">
              <div className="group w-full bg-white rounded-[24px] p-8 sm:p-9 border border-[#F6EBEA] shadow-[0_8px_30px_rgba(235,185,188,0.12)] hover:shadow-[0_14px_35px_rgba(200,120,130,0.18)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  {/* Top Row: Large Step Number + Package Return Icon */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-serif-luxury text-[34px] sm:text-[38px] font-bold text-[#E5A8A9] tracking-wide select-none leading-none block">
                        04
                      </span>
                      {/* Blush divider line below step number */}
                      <div className="w-9 h-[2px] bg-[#EBB4B6] rounded-full mt-3 mb-5" />
                    </div>
                    
                    {/* Circular Icon Area (Prominent & Luxury) */}
                    <div className="w-20 h-20 rounded-full bg-[#FAF0F0] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0 relative">
                      <svg className="w-11 h-11 text-[#A85860]" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        {/* Package Box */}
                        <path d="M10 14l6-3 6 3v9l-6 3-6-3v-9z" />
                        <path d="M10 14l6 3 6-3" />
                        <line x1="16" y1="17" x2="16" y2="26" />
                        {/* Curved Return Arrow */}
                        <path d="M22 8a7 7 0 0 0-9 2" />
                        <path d="M21 5l2 3-3 2" />
                        {/* Sparkles */}
                        <path d="M6 18l.4 1L8 19.5l-1.6.4L6 21l-.4-1.1L4 19.5l1.6-.4z" fill="currentColor" stroke="none" />
                      </svg>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif-luxury text-xl sm:text-[22px] font-bold text-stone-900 tracking-tight mb-3 leading-snug">
                    Easy<br />Return
                  </h3>
                  <p className="text-[13px] text-stone-600 leading-relaxed font-normal">
                    Return the outfit after the event without having to dry-clean it. Receive your full refundable deposit immediately.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. AUTHENTIC CUSTOMER REVIEWS (INTERACTIVE 8-REVIEW SLIDER) */}
      <section className="relative py-4 sm:py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-4 sm:space-y-5">
        {/* Header with Navigation Controls */}
        <div className="relative flex flex-col md:flex-row md:items-end justify-between items-center text-center md:text-left gap-3 pb-0.5">
          <div className="space-y-1 sm:space-y-1.5 max-w-2xl">
            <p className="font-script text-2xl sm:text-3xl text-[#8b1828]">
              Loved By Real Brides
            </p>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-[38px] font-bold text-stone-900 tracking-tight leading-tight">
              Customer Reviews & Stories
            </h2>
            <div className="w-16 h-0.5 bg-[#8b1828]/40 mx-auto md:mx-0 rounded-full mt-1.5" />
            <p className="text-xs sm:text-sm text-stone-500 pt-0.5">
              4.8 / 5.0 Average Rating from 350+ Happy Couples across Punjab & Overseas
            </p>
          </div>

          {/* Slider Prev / Next Controls (Desktop / Tablet Header) */}
          <div className="hidden md:flex items-center gap-2 pt-2 md:pt-0">
            <button
              onClick={() => scrollReviews('left')}
              aria-label="Previous Review"
              className="w-10 h-10 rounded-full border border-stone-300 hover:border-[#8b1828] hover:bg-[#8b1828] hover:text-white text-stone-700 flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95 bg-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollReviews('right')}
              aria-label="Next Review"
              className="w-10 h-10 rounded-full border border-stone-300 hover:border-[#8b1828] hover:bg-[#8b1828] hover:text-white text-stone-700 flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95 bg-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reviews Horizontal Carousel Track (Dynamic from MongoDB Atlas) */}
        <div
          ref={reviewScrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar touch-pan-x snap-x snap-mandatory"
        >
          {reviewsList.map((rev, idx) => (
            <div
              key={rev._id || rev.id || idx}
              className="flex-none w-[280px] sm:w-[320px] lg:w-[340px] snap-start bg-white rounded-2xl p-6 border border-stone-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(139,24,40,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between select-none"
            >
              <div>
                {/* Customer Initials Header (No external image) */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-[#8b1828]/10 text-[#8b1828] font-bold text-sm flex items-center justify-center shrink-0 border border-[#8b1828]/15">
                    {rev.author ? rev.author.charAt(0).toUpperCase() : 'B'}
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="font-semibold text-stone-900 block truncate text-xs sm:text-sm">
                      {rev.author}
                    </span>
                    <span className="text-[11px] text-stone-400 block truncate">
                      {rev.city} • {rev.date}
                    </span>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < (rev.rating || 5)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-stone-200 text-stone-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-normal mb-4 line-clamp-4 italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                {/* Associated Outfit Title if present */}
                {rev.productTitle && (
                  <p className="text-[10px] text-[#8b1828] font-semibold truncate mb-2">
                    Outfit: {rev.productTitle}
                  </p>
                )}
              </div>

              {/* Author & Verification Footer */}
              <div className="border-t border-stone-100 pt-3 flex items-center justify-between gap-2 text-[11px] text-stone-500 mt-2">
                <span className="text-[11px] text-stone-400 truncate">
                  Verified Booking
                </span>
                <div className="flex-shrink-0 inline-flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] whitespace-nowrap">
                  <CheckCircle className="w-3 h-3 fill-emerald-600 text-white flex-shrink-0" />
                  <span>{rev.tag || 'Verified Bride'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) */}
      <section className="bg-[#FAF8F5] border-y border-[#F0EAE1] py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7 sm:space-y-8">
          
          {/* FAQ Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-semibold text-[#8b1828]">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Rental Clarifications</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[40px] font-bold text-stone-900 tracking-tight leading-tight">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-0.5 bg-[#8b1828]/40 mx-auto rounded-full mt-2" />
            <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto font-normal">
              Everything you need to know about fittings, dates, hygiene, and deposit refunds.
            </p>
          </div>

          {/* FAQ Accordion Items */}
          <div className="space-y-3.5">
            {HOMEPAGE_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:border-amber-300/50 transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 font-sans text-sm sm:text-base font-semibold text-stone-800 hover:text-[#8b1828] transition-colors"
                  >
                    <span className="leading-snug">{faq.question}</span>
                    <div
                      className={`w-7 h-7 rounded-full bg-[#FAF0F1] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-[#8b1828] text-white' : 'text-[#8b1828]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-[13.5px] text-stone-600 leading-relaxed border-t border-stone-100 font-normal">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Help Footer */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="font-sans text-sm sm:text-base font-semibold text-stone-900">
                Still have a question or specific event date?
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Our bridal stylist is online on WhatsApp to answer queries instantly.
              </p>
            </div>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello Ghar Shagna Da team, I have a query about renting bridal outfits.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-sm transition-transform hover:scale-105 shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>

        </div>
      </section>

      {/* 7. DIRECT CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#8b1828] to-[#a31f31] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl text-white">
          <p className="font-script text-3xl text-amber-200">
            Let Us Dress Your Shagna Di Raat
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold">
            Reserve Your Outfit Before Wedding Season Fills Up
          </h2>
          <p className="text-sm text-rose-100 max-w-xl mx-auto">
            Directly connect with our styling consultant to inspect sizes, check specific dates, or schedule an in-person trial appointment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello Ghar Shagna Da! I would like to book an appointment to try bridal lehengas and sherwanis.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 px-8 rounded-full text-sm shadow-md transition-transform hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Connect on WhatsApp</span>
            </a>

            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-stone-900 hover:bg-stone-100 font-bold py-3 px-8 rounded-full text-sm transition-all"
            >
              <Calendar className="w-4 h-4 text-[#8b1828]" />
              <span>Fill Quick Inquiry Form</span>
            </button>
          </div>
        </div>
      </section>

      <QueryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
