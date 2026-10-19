'use client';

import React from 'react';
import { Tag, DollarSign } from 'lucide-react';
import { OCCASION_OPTIONS, OutfitItem, slugify } from '../types';
import { CATEGORIES } from '@/data/products';

// Women's & men's "Shop by Category" collections from the website (occasion pages excluded)
const OUTFIT_CATEGORY_OPTIONS = CATEGORIES.filter((c) => !c.slug.includes('occasion=')).map((c) => ({
  id: c.id,
  label: c.title,
  slug: c.slug,
  base: c.slug.split('?')[0],
}));

function getSelectedCategoryId(formData: Partial<OutfitItem>) {
  const base = formData.categorySlug || 'bridal-lehengas';
  const match =
    OUTFIT_CATEGORY_OPTIONS.find((c) => c.base === base && c.label === formData.category) ||
    OUTFIT_CATEGORY_OPTIONS.find((c) => c.slug === base) ||
    OUTFIT_CATEGORY_OPTIONS.find((c) => c.base === base);
  return match ? match.id : OUTFIT_CATEGORY_OPTIONS[0].id;
}

interface OutfitBasicPricingSectionProps {
  formData: Partial<OutfitItem>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<OutfitItem>>>;
}

export default function OutfitBasicPricingSection({
  formData,
  setFormData,
}: OutfitBasicPricingSectionProps) {
  return (
    <>
      {/* 🏷️ SECTION 1: BASIC INFORMATION */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700">
          <Tag className="w-3.5 h-3.5 text-[#8b1828]" />
          <span>Outfit Titles &amp; Branding</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700">
              Outfit Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Royal Heritage Crimson Velvet Lehenga"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#8b1828] focus:bg-white rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#8b1828]/10 transition-all placeholder-stone-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700">
              Signature Subtitle
            </label>
            <input
              type="text"
              placeholder="e.g. Signature Bridal Couture • Handcrafted Velvet"
              value={formData.subtitle || ''}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#8b1828] focus:bg-white rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8b1828]/10 transition-all placeholder-stone-400"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-stone-700">
            URL Slug
          </label>
          <div className="flex items-center bg-[#FAF8F5] border border-stone-200 focus-within:border-[#8b1828] focus-within:bg-white rounded-xl focus-within:ring-2 focus-within:ring-[#8b1828]/10 transition-all">
            <span className="pl-3.5 text-xs sm:text-sm text-stone-400 font-mono whitespace-nowrap">/product/</span>
            <input
              type="text"
              placeholder={slugify(formData.title || '') || 'royal-heritage-crimson-velvet-lehenga'}
              value={formData.slug || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-'),
                })
              }
              onBlur={() => setFormData({ ...formData, slug: slugify(formData.slug || '') })}
              className="w-full bg-transparent py-2.5 pr-3.5 text-xs sm:text-sm text-stone-900 font-mono focus:outline-none placeholder-stone-400"
            />
          </div>
          <p className="text-[11px] text-stone-500">
            Khaali chhodoge to title se apne aap ban jaayega.
          </p>
        </div>
      </div>

      {/* 💰 SECTION 2: CATEGORY & PRICING */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700">
          <DollarSign className="w-3.5 h-3.5 text-[#8b1828]" />
          <span>Category, Rental &amp; MRP Value</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700">
              Outfit Category *
            </label>
            <div className="relative">
              <select
                value={getSelectedCategoryId(formData)}
                onChange={(e) => {
                  const selected = OUTFIT_CATEGORY_OPTIONS.find((c) => c.id === e.target.value);
                  if (!selected) return;
                  setFormData({
                    ...formData,
                    categorySlug: selected.base,
                    category: selected.label,
                  });
                }}
                className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#8b1828] focus:bg-white rounded-xl py-2.5 px-3 text-xs sm:text-sm text-stone-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#8b1828]/10 transition-all appearance-none cursor-pointer pr-8"
              >
                <optgroup label="Women">
                  {OUTFIT_CATEGORY_OPTIONS.filter((c) => c.base !== 'sherwanis').map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Men">
                  {OUTFIT_CATEGORY_OPTIONS.filter((c) => c.base === 'sherwanis').map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </optgroup>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-stone-500">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700">
              Occasion / Event *
            </label>
            <div className="relative">
              <select
                value={
                  OCCASION_OPTIONS.find((o) =>
                    formData.occasion?.toLowerCase().includes(o.value.toLowerCase())
                  )?.value ||
                  (formData.occasion || 'Cocktail')
                }
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#8b1828] focus:bg-white rounded-xl py-2.5 px-3 text-xs sm:text-sm text-stone-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#8b1828]/10 transition-all appearance-none cursor-pointer pr-8"
              >
                {OCCASION_OPTIONS.map((occ) => (
                  <option key={occ.value} value={occ.value}>
                    ✨ {occ.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-stone-500">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700">
              Rental Price *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. ₹8,999"
              value={formData.price || ''}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#8b1828] focus:bg-white rounded-xl py-2.5 px-3 text-xs sm:text-sm text-[#8b1828] font-bold focus:outline-none focus:ring-2 focus:ring-[#8b1828]/10 transition-all placeholder-stone-400 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700">
              Original Retail MRP
            </label>
            <input
              type="text"
              placeholder="e.g. ₹95,000"
              value={formData.originalValue || ''}
              onChange={(e) => setFormData({ ...formData, originalValue: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#8b1828] focus:bg-white rounded-xl py-2.5 px-3 text-xs sm:text-sm text-stone-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#8b1828]/10 transition-all placeholder-stone-400 font-mono"
            />
          </div>
        </div>

        {/* Quick Occasion Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mr-1">
            Quick Select Events (multiple):
          </span>
          {['Cocktail', 'Reception', 'Sangeet', 'Bridesmaid', 'Mehendi', 'Haldi'].map((occ) => {
            const parts = (formData.occasion || '')
              .split(',')
              .map((p) => p.trim())
              .filter(Boolean);
            const matchesOcc = (p: string) => p.toLowerCase().includes(occ.toLowerCase());
            const isActive = parts.some(matchesOcc);
            return (
              <button
                key={occ}
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    occasion: (isActive ? parts.filter((p) => !matchesOcc(p)) : [...parts, occ]).join(', '),
                  })
                }
                className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#8b1828] text-white border-[#8b1828] shadow-xs'
                    : 'bg-[#FAF8F5] hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                {occ}
              </button>
            );
          })}
        </div>

        {/* Featured Toggle (Trending Now Homepage) */}
        <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between">
          <div>
            <label htmlFor="outfitFeaturedToggle" className="text-xs font-bold text-stone-800 cursor-pointer block">
              Featured on Homepage (Trending Now)
            </label>
            <p className="text-[11px] text-stone-500">
              When checked, this outfit appears in the &quot;Featured Outfits on Rent&quot; section on the home page.
            </p>
          </div>
          <input
            type="checkbox"
            id="outfitFeaturedToggle"
            checked={Boolean(formData.featured)}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-5 h-5 rounded text-[#8b1828] accent-[#8b1828] cursor-pointer shrink-0"
          />
        </div>
      </div>
    </>
  );
}
