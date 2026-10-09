'use client';

import React from 'react';
import Image from 'next/image';
import { Search, RefreshCw, Package, Edit3, Trash2, Star, CalendarCheck } from 'lucide-react';
import { OutfitItem, CATEGORY_OPTIONS, OCCASION_OPTIONS, BookingLead } from './types';

interface OutfitsTabProps {
  products: OutfitItem[];
  filteredProducts: OutfitItem[];
  loadingProducts: boolean;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  handleEdit: (product: OutfitItem) => void;
  handleDeleteProduct: (id: string, title: string) => void;
  onOpenReviews?: (product: OutfitItem) => void;
  onOpenInquiries?: (product: OutfitItem) => void;
  bookings?: BookingLead[];
}

export default function OutfitsTab({
  filteredProducts,
  loadingProducts,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  handleEdit,
  handleDeleteProduct,
  onOpenReviews,
  onOpenInquiries,
  bookings = [],
}: OutfitsTabProps) {
  return (
    <div className="space-y-4">
      {/* Search & Category Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#EDE4D8] shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by outfit title, fabric, occasion (Cocktail, Sangeet, Haldi)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl py-2 pl-10 pr-4 text-xs text-stone-900 focus:outline-none focus:border-[#8b1828] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-auto bg-[#FAF8F5] border border-stone-200 rounded-xl py-2 px-3 text-xs font-semibold text-stone-800 focus:outline-none focus:border-[#8b1828] cursor-pointer"
          >
            <option value="all">All Outfits &amp; Occasions</option>
            <optgroup label="Outfit Styles" className="font-bold text-[#8b1828]">
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </optgroup>
            <optgroup label="Wedding Events &amp; Occasions" className="font-bold text-[#8b1828]">
              {OCCASION_OPTIONS.map((occ) => (
                <option key={occ.value} value={occ.value}>
                  ✨ {occ.label}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      {/* Inventory List Table */}
      <div className="bg-white rounded-2xl border border-[#EDE4D8] shadow-xs overflow-hidden">
        {loadingProducts ? (
          <div className="p-12 text-center text-stone-500">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#8b1828]" />
            <p className="text-xs">Loading outfit inventory from database...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-stone-500">
            <Package className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-stone-800">No outfits found</p>
            <p className="text-xs text-stone-400 mt-1">Try another search or add a new outfit.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-stone-600 border-b border-[#EDE4D8] uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Outfit & Image</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Rental Price</th>
                  <th className="py-3 px-4">Fabric & Detail</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-14 bg-stone-100 rounded-lg overflow-hidden shrink-0 border border-stone-200">
                          <Image
                            src={p.images[0] || '/products/lehenga-maroon.png'}
                            alt={p.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 max-w-[200px] sm:max-w-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-stone-900 block truncate text-sm">
                              {p.title}
                            </span>
                            {p.featured && (
                              <span className="bg-rose-50 text-[#8b1828] border border-rose-200 text-[9px] font-bold px-1.5 py-0.2 rounded shrink-0">
                                ⭐ Trending
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-stone-400 block truncate">
                            {p.subtitle || p.color}
                          </span>
                          {/* Quick Reviews & Inquiries Pills Row */}
                          <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                            <button
                              type="button"
                              onClick={() => onOpenReviews && onOpenReviews(p)}
                              className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors cursor-pointer"
                              title="View or Add Reviews"
                            >
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              <span>{(p.reviews || []).length} Reviews</span>
                              <span className="text-amber-500 font-bold ml-0.5">+</span>
                            </button>

                            {/* Inquiries Pill for this product */}
                            {(() => {
                              const prodInquiries = bookings.filter(
                                (b) =>
                                  b.productTitle &&
                                  (b.productTitle.toLowerCase() === p.title.toLowerCase() ||
                                    p.title.toLowerCase().includes(b.productTitle.toLowerCase()) ||
                                    b.productTitle.toLowerCase().includes(p.title.toLowerCase()))
                              );
                              return (
                                <button
                                  type="button"
                                  onClick={() => onOpenInquiries && onOpenInquiries(p)}
                                  className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full transition-colors cursor-pointer border ${
                                    prodInquiries.length > 0
                                      ? 'bg-rose-50 hover:bg-rose-100 text-[#8b1828] border-rose-200 font-bold'
                                      : 'bg-stone-50 hover:bg-stone-100 text-stone-500 border-stone-200'
                                  }`}
                                  title={`View inquiries for ${p.title}`}
                                >
                                  <CalendarCheck className="w-3 h-3 text-[#8b1828]" />
                                  <span>{prodInquiries.length} Inquiries</span>
                                </button>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-stone-600 font-medium">{p.category}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-[#8b1828] text-sm">{p.price}</span>
                      <span className="text-[10px] text-stone-400 block">Val: {p.originalValue}</span>
                    </td>
                    <td className="py-3 px-4 text-stone-600">
                      <span className="block truncate max-w-[150px]">{p.fabric}</span>
                      <span className="text-[10px] text-stone-400 block truncate max-w-[150px]">
                        {p.work}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          (p.status || 'available') === 'available'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : p.status === 'rented'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-stone-100 text-stone-700 border border-stone-200'
                        }`}
                      >
                        {(p.status || 'available').toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {/* Direct Inquiries Side Button */}
                        <button
                          type="button"
                          onClick={() => onOpenInquiries && onOpenInquiries(p)}
                          className="p-1.5 text-stone-600 hover:text-[#8b1828] hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="View Inquiries for this outfit"
                        >
                          <CalendarCheck className="w-4 h-4" />
                        </button>
                        {/* Direct Reviews Side Button */}
                        <button
                          type="button"
                          onClick={() => onOpenReviews && onOpenReviews(p)}
                          className="p-1.5 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                          title="Manage Reviews"
                        >
                          <Star className="w-4 h-4 fill-amber-400" />
                        </button>
                        <button
                          onClick={() => handleEdit(p)}
                          className="p-1.5 text-stone-600 hover:text-[#8b1828] hover:bg-rose-50 rounded-lg transition-colors"
                          title="Edit Outfit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p._id || p.id, p.title)}
                          className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Outfit"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
