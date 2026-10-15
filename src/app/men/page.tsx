'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MessageCircle } from 'lucide-react';
import { INITIAL_PRODUCTS, SITE_CONFIG } from '@/data/products';
import ProductCard from '@/components/catalog/ProductCard';

export default function MenCatalogPage() {
  const [selectedSubtype, setSelectedSubtype] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
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
            category: p.categorySlug || p.category || 'sherwanis',
            categoryLabel: p.category || 'Groom Sherwanis',
            rentalPrice: p.price || p.rentalPrice || '',
            securityDeposit: p.deposit || p.securityDeposit || '',
            originalPrice: p.originalValue || p.originalPrice || '',
            color: p.color || '',
            fabric: p.fabric || '',
            embroidery: p.work || p.embroidery || '',
            occasion: p.occasion || '',
            description: p.description || '',
            includes: p.includes || [],
            images: p.images && p.images.length > 0 ? p.images : ['/hero-groom.jpg'],
            sizes: p.sizes || ['Custom Fit Available'],
            rentalDays: p.duration || p.rentalDays || '3-4 Days',
            isTrending: Boolean(p.featured ?? p.isTrending),
            status: p.status || 'available',
            reviews: p.reviews || [],
            metaDescription: p.description || '',
          }));
          setProductsList(mapped);
        }
      })
      .catch((err) => {
        console.error('Failed to load men catalog', err);
      });
  }, []);

  // Filter only Men's outfits (sherwanis, achkans, kurta sets)
  const menProducts = productsList.filter((p) => {
    const isMenCategory =
      p.category === 'sherwanis' ||
      p.category === 'men' ||
      (p.title && /sherwani|achkan|bandhgala|kurta|groom/i.test(p.title));

    if (!isMenCategory) return false;

    const matchesSearch =
      (p.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.fabric || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.color || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.occasion || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubtype =
      selectedSubtype === 'all' ||
      (selectedSubtype === 'wedding' && /wedding|anand karaj|barat/i.test(p.occasion || p.title)) ||
      (selectedSubtype === 'reception' && /reception|evening/i.test(p.occasion || p.title)) ||
      (selectedSubtype === 'sangeet' && /sangeet|mehendi/i.test(p.occasion || p.title));

    return matchesSearch && matchesSubtype;
  });

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 sm:pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-stone-500">
          <Link href="/" className="hover:text-[#8b1828]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#8b1828] font-bold">Men&apos;s Wedding Collection</span>
        </nav>

        {/* Header */}
        <div className="text-center space-y-3">
          <span className="font-script text-3xl sm:text-4xl text-[#8b1828]">
            Shahi Groom & Men&apos;s Couture
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-stone-900">
            Royal Groom Sherwanis & Achkans on Rent
          </h1>
          <p className="text-sm text-stone-600 max-w-2xl mx-auto">
            From regal ivory Lucknowi Chikankari to royal velvet bandhgalas, explore designer groom wear tailored with complimentary fitting trials in Punjab.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white border border-[#EBE3D7] p-4 rounded-2xl shadow-xs">
          {/* Subtype Filter */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: 'all', label: 'All Men Outfits' },
              { id: 'wedding', label: 'Wedding & Anand Karaj' },
              { id: 'reception', label: 'Reception Special' },
              { id: 'sangeet', label: 'Sangeet & Mehendi' },
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubtype(sub.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedSubtype === sub.id
                    ? 'bg-[#8b1828] text-white shadow-sm'
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sherwani, color, fabric..."
              className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#8b1828]/20 focus:border-[#8b1828]"
            />
          </div>
        </div>

        {/* Products Grid - 3 cards per row */}
        {menProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {menProducts.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300 p-8">
            <p className="font-serif-luxury text-lg text-stone-700 font-bold">
              No Men outfits found matching your criteria.
            </p>
            <p className="text-xs text-stone-500 mt-1 mb-5">
              Try adjusting your search terms or view our complete wedding catalog.
            </p>
            <button
              onClick={() => {
                setSelectedSubtype('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 bg-[#8b1828] text-white px-5 py-2.5 rounded-full text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* WhatsApp Consultation Banner */}
        <div className="bg-gradient-to-r from-[#8b1828] to-[#a31f31] rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl space-y-4">
          <p className="font-script text-3xl text-amber-200">
            Coordinated Bride & Groom Look
          </p>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold">
            Need Groom Sherwani Color Matching?
          </h2>
          <p className="text-xs sm:text-sm text-rose-100 max-w-lg mx-auto">
            Share your bride&apos;s lehenga color swatch on WhatsApp and our master stylists will recommend matching stoles, turbans, and sherwanis.
          </p>
          <div className="pt-2">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello Ghar Shagna Da team, I want to inquire about groom sherwani rental and color matching with bridal lehenga.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 px-8 rounded-full text-xs sm:text-sm shadow-md transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
