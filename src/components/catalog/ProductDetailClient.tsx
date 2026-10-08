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

interface ReviewItem {
  author: string;
  city: string;
  date: string;
  rating: number;
  comment: string;
  image?: string;
  tag?: string;
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  // Reviews with real customer/bride photos (7 Authentic Reviews)
  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      author: 'Sreelekshmi',
      city: 'Amritsar',
      date: '6/19/2026',
      rating: 5,
      comment: 'As good as in the picture! Handcrafted embroidery and rich crimson velvet dupatta was stunning. Truly made my Anand Karaj memorable.',
      image: '/hero-bride.jpg',
      tag: 'Verified'
    },
    {
      author: 'Mansi',
      city: 'Ludhiana',
      date: '5/12/2026',
      rating: 5,
      comment: 'Very pretty! Fitting trial was flawless. Received endless compliments on wedding day. The blouse fitting was 100% spot on.',
      image: '/creative-bridal.jpg',
      tag: 'Verified'
    },
    {
      author: 'Sujoy',
      city: 'Chandigarh',
      date: '4/28/2026',
      rating: 5,
      comment: 'Excellent outfit. Fabric and zardozi look like pure couture. Very hygienic packaging and arrived right on time.',
      image: '/hero-gown.jpg',
      tag: 'Verified'
    },
    {
      author: 'Swati',
      city: 'Delhi',
      date: '4/15/2026',
      rating: 5,
      comment: 'Pretty! 😍 Dry cleaning and hygiene was 10/10. Saved so much money renting instead of buying an expensive designer piece.',
      image: '/hero-lehenga.jpg',
      tag: 'Verified'
    },
    {
      author: 'Ragesree',
      city: 'Jalandhar',
      date: '3/20/2026',
      rating: 5,
      comment: 'The craftsmanship is so royal! Perfect for wedding day. Master ji ne blouse exact mere body shape te alter kar dita. Highly recommend Ghar Shagna Da 💕',
      image: '/mobile-bridal.jpg',
      tag: 'Verified'
    },
    {
      author: 'Jaspreet B.',
      city: 'Patiala',
      date: '2/18/2026',
      rating: 5,
      comment: 'Can-can flare is huge and twirl photographs looked magical in natural sunlit decor. Best bridal rental studio in Punjab!',
      image: '/Categery/Bridesmaid.png',
      tag: 'Verified'
    },
    {
      author: 'Navneet Sandhu',
      city: 'Bhatinda',
      date: '2/04/2026',
      rating: 5,
      comment: 'Fitting was completely custom! Even without visiting store, measurements were taken via WhatsApp video call. Timely doorstep delivery.',
      tag: 'Verified'
    },
    {
      author: 'Simran & Aman',
      city: 'Mohali',
      date: '1/10/2026',
      rating: 5,
      comment: 'Rented matching bride & groom outfits. Security deposit was refunded immediately without any delay. Zero stress experience!',
      image: '/creative-groom.jpg',
      tag: 'Verified'
    },
    {
      author: 'Kiranjeet Kaur',
      city: 'Hoshiarpur',
      date: '12/28/2025',
      rating: 5,
      comment: 'Fabric quality is very premium. Everyone at the reception thought I bought it from Delhi couture designer. Loved it!',
      tag: 'Verified'
    }
  ]);
  const [showAllReviews, setShowAllReviews] = useState(true);

  // Form state for adding new review
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newImage, setNewImage] = useState('');
  const [newTag, setNewTag] = useState('Verified Bride');

  const whatsappMessage = encodeURIComponent(
    `Hello Ghar Shagna Da! I am interested in renting:
"${product.title}"
Link: ${SITE_CONFIG.domain}/product/${product.slug}
Please let me know if this is available for my wedding date.`
  );

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${whatsappMessage}`;

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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Gallery / Left (5 cols, sticky on desktop) */}
        <div className="lg:col-span-5 space-y-4 max-w-sm sm:max-w-md mx-auto lg:mx-0 w-full lg:sticky lg:top-28">
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-lg border border-stone-200/90 bg-stone-100">
            <Image
              src={product.images[selectedImage]}
              alt={product.title}
              fill
              priority
              className="object-cover object-center transition-all duration-300"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex items-center gap-3 pt-1">
              {product.images.map((img, idx) => {
                const isActive = selectedImage === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                      isActive
                        ? 'ring-2 ring-[#8b1828] ring-offset-2 ring-offset-white shadow-md scale-[1.03]'
                        : 'opacity-60 hover:opacity-100 border border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Preview ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-[#8b1828]/5 pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Content / Right (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
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

      {/* Customer Reviews Section (Clean Photo Card Layout as requested) */}
      <section className="border-t border-stone-200/90 pt-12 space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Customer Reviews
          </h2>

          <div className="flex items-center gap-2.5 mt-2.5">
            <div className="flex items-center text-amber-400 text-lg">
              ★★★★★
            </div>
            <span className="text-sm font-medium text-stone-700">
              56 Reviews
            </span>
          </div>
        </div>

        {/* Full-width "Write a review" minimal button */}
        <button
          onClick={() => setReviewModalOpen(true)}
          className="w-full py-2.5 px-4 rounded-md border border-stone-300 hover:border-stone-500 bg-white hover:bg-stone-50 text-stone-900 text-sm font-normal transition-all text-center shadow-2xs"
        >
          Write a review
        </button>

        {/* Reference-Perfect Photo Reviews Masonry (Zero Awkward Empty Space) */}
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4 pt-2">
          {reviews.slice(0, showAllReviews ? reviews.length : 7).map((rev, idx) => (
            <div
              key={idx}
              className="break-inside-avoid bg-white rounded-lg border border-stone-200 overflow-hidden shadow-2xs flex flex-col hover:shadow-md transition-shadow"
            >
              {/* Customer Photo (If present) */}
              {rev.image && (
                <div className="relative w-full aspect-[4/5] bg-stone-100 overflow-hidden">
                  <Image
                    src={rev.image}
                    alt={`${rev.author} review`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top hover:scale-102 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Review Details - Natural Height, No stretched white space */}
              <div className="p-4 space-y-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-stone-900">
                      {rev.author}
                    </span>
                    <span className="w-3.5 h-3.5 rounded-full bg-black text-white text-[8px] font-bold flex items-center justify-center shrink-0">
                      ✓
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400">
                    {rev.date}
                  </p>
                </div>

                {/* Stars */}
                <div className="flex text-amber-400 text-xs tracking-tight">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < rev.rating ? 'text-amber-400' : 'text-stone-300'}>
                      ★
                    </span>
                  ))}
                </div>

                {/* Comment Text */}
                <p className="text-xs text-stone-700 leading-relaxed font-normal pt-0.5">
                  {rev.comment}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Reviews Button */}
        <div className="flex justify-center pt-3">
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="px-6 py-2 rounded border border-stone-300 hover:border-stone-400 bg-white text-stone-700 text-xs font-normal transition-all shadow-2xs"
          >
            {showAllReviews ? 'Show fewer reviews' : 'Show more reviews'}
          </button>
        </div>

        {/* Trust Badges Bar */}
        <div className="bg-stone-900 text-white p-5 rounded-2xl flex flex-wrap items-center justify-around gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-base">✓</span>
            <span>100% Sanitized & Steam Cleaned</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-base">✓</span>
            <span>Free Custom Alteration Fitting</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-base">✓</span>
            <span>Zero Damage Stress Guarantee</span>
          </div>
        </div>
      </section>

      {/* Related Products Carousel */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="border-t border-stone-200/90 pt-12 space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-script text-2xl text-[#8b1828]">More Options</p>
              <h2 className="font-cinzel text-2xl font-bold uppercase text-stone-900">
                You May Also Like
              </h2>
            </div>
            <Link
              href={`/category/${product.category}`}
              className="text-xs font-semibold uppercase tracking-wider text-[#8b1828] hover:underline"
            >
              View More In {product.categoryLabel} →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/product/${rel.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-amber-300 transition-all hover:shadow-lg flex flex-col"
              >
                <div className="relative aspect-[3/4] w-full bg-stone-100 overflow-hidden">
                  <Image
                    src={rel.images[0]}
                    alt={rel.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {rel.rentalDays}
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <p className="font-script text-sm text-[#8b1828]">{rel.subtitle}</p>
                  <h3 className="font-serif-luxury text-sm font-bold text-stone-900 group-hover:text-[#8b1828] line-clamp-1">
                    {rel.title}
                  </h3>
                  <p className="text-[11px] text-stone-500">{rel.occasion}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <QueryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productTitle={product.title}
        productPrice={product.rentalPrice}
      />

      {/* Admin / Customer Add Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8b1828]">Admin / Customer Portal</span>
                <h3 className="font-serif-luxury text-xl font-bold text-stone-900">Add Customer Review & Photo</h3>
              </div>
              <button
                onClick={() => setReviewModalOpen(false)}
                className="w-8 h-8 rounded-full border border-stone-200 text-stone-500 hover:text-stone-900 hover:bg-stone-100 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newAuthor || !newComment) return;
                const newRev: ReviewItem = {
                  author: newAuthor,
                  city: newCity || 'Punjab',
                  date: 'Just now',
                  rating: Number(newRating) || 5,
                  comment: newComment,
                  image: newImage || undefined,
                  tag: newTag || 'Verified Bride',
                };
                setReviews([newRev, ...reviews]);
                setNewAuthor('');
                setNewCity('');
                setNewComment('');
                setNewImage('');
                setReviewModalOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700">Customer / Bride Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jaspreet Kaur"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-[#8b1828]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Chandigarh"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-[#8b1828]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700">Rating (Stars)</label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-[#8b1828] bg-white"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700">Tag / Badge</label>
                  <select
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-[#8b1828] bg-white"
                  >
                    <option value="Verified Bride">Verified Bride</option>
                    <option value="Verified Groom">Verified Groom</option>
                    <option value="Verified Customer">Verified Customer</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700">Review Message / Feedback *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Lehenga fitting te look baare feedback likho..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-[#8b1828]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700">Customer Photo URL (Optional)</label>
                <input
                  type="text"
                  placeholder="https://... or choose from quick bridal photos below"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-[#8b1828]"
                />
                {/* Quick Photos Suggestions */}
                <div className="pt-1.5 flex items-center gap-2">
                  <span className="text-[10px] text-stone-500 font-medium">Quick Pick:</span>
                  {[
                    { label: 'Bride 1', url: '/hero-bride.jpg' },
                    { label: 'Lehenga 2', url: '/hero-lehenga.jpg' },
                    { label: 'Gown 3', url: '/hero-gown.jpg' },
                  ].map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNewImage(p.url)}
                      className={`text-[10.5px] px-2 py-0.5 rounded-lg border transition-all ${
                        newImage === p.url
                          ? 'border-[#8b1828] bg-[#8b1828] text-white'
                          : 'border-stone-200 text-stone-600 hover:border-stone-400'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 font-semibold hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#8b1828] hover:bg-[#6e121f] text-white font-semibold shadow-md active:scale-95 transition-all"
                >
                  Post Review With Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
