'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { INITIAL_PRODUCTS, CATEGORIES } from '@/data/products';
import ProductCard from '@/components/catalog/ProductCard';

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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
        console.error('Failed to load catalog outfits', err);
      });
  }, []);

  const filteredProducts = productsList.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      (product.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.fabric || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.color || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.embroidery || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.occasion || '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="font-script text-3xl text-[#8b1828]">Rental Catalog</span>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-stone-900">
          Bridal & Groom Outfits on Rent
        </h1>
        <p className="text-sm text-stone-600 max-w-xl mx-auto">
          Explore handcrafted bridal lehengas, royal groom sherwanis, and wedding event dresses with custom alterations.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#faf8f5] border border-stone-200/80 p-4 rounded-2xl">
        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#8b1828] text-white shadow'
                : 'bg-white text-stone-700 hover:text-stone-900 border border-stone-200'
            }`}
          >
            All Outfits ({productsList.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-[#8b1828] text-white shadow'
                  : 'bg-white text-stone-700 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by fabric, color, velvet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-xl py-2 pl-9 pr-4 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#8b1828]"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span>Showing {filteredProducts.length} rental outfits</span>
          <span>Complimentary custom fitting included on every booking</span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#faf8f5] rounded-3xl border border-stone-200 space-y-3">
            <p className="text-sm text-stone-600">No outfits matched your search query.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs text-[#8b1828] font-bold underline"
            >
              Clear filters and view all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
