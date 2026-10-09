'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { OutfitItem, PageSeoItem } from '../types';

interface PageSeoSelectorProps {
  selectedPagePath: string;
  setSelectedPagePath: (path: string) => void;
  presetPages: { path: string; label: string }[];
  products: OutfitItem[];
  pageList: PageSeoItem[];
  productSearch: string;
  setProductSearch: (s: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (c: string) => void;
  productPage: number;
  setProductPage: React.Dispatch<React.SetStateAction<number>>;
  filteredProducts: OutfitItem[];
  paginatedProducts: OutfitItem[];
  totalPages: number;
  currentPageSafe: number;
  allCategories: string[];
  onAddCustomPath: () => void;
}

export default function PageSeoSelector({
  selectedPagePath,
  setSelectedPagePath,
  presetPages,
  products,
  pageList,
  productSearch,
  setProductSearch,
  selectedCategoryFilter,
  setSelectedCategoryFilter,
  setProductPage,
  filteredProducts,
  paginatedProducts,
  totalPages,
  currentPageSafe,
  allCategories,
  onAddCustomPath,
}: PageSeoSelectorProps) {
  return (
    <div className="bg-white border border-[#EDE4D8] rounded-2xl p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-wider uppercase text-stone-700">
            SELECT PAGE OR PRODUCT TO EDIT SEO:
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500 font-mono">
            Currently Editing: <span className="text-[#8b1828] font-bold">{selectedPagePath}</span>
          </span>
          <button
            type="button"
            onClick={onAddCustomPath}
            className="text-[11px] text-[#8b1828] hover:text-[#721320] font-semibold flex items-center gap-1 border border-rose-200/80 px-2 py-0.5 rounded-lg bg-rose-50 transition-colors cursor-pointer"
          >
            <span>+ Add Custom Path</span>
          </button>
        </div>
      </div>

      {/* Dropdown Selector with Optgroups */}
      <div className="relative">
        <select
          value={selectedPagePath}
          onChange={(e) => setSelectedPagePath(e.target.value)}
          className="w-full bg-[#FAF8F5] border border-stone-200 hover:border-stone-300 rounded-xl px-4 py-3 text-sm font-semibold text-stone-800 focus:outline-none focus:border-[#8b1828] focus:bg-white focus:ring-2 focus:ring-[#8b1828]/10 transition-all appearance-none cursor-pointer"
        >
          <optgroup label="Core Website Pages & Categories" className="font-bold text-[#8b1828]">
            {presetPages.map((p) => (
              <option key={p.path} value={p.path} className="text-stone-800 py-1.5 font-normal">
                {p.label}
              </option>
            ))}
          </optgroup>

          {products.length > 0 && (
            <optgroup label={`Live Outfits & Products (${products.length})`} className="font-bold text-[#8b1828]">
              {products.map((prod) => {
                const prodPath = `/product/${prod.slug}`;
                const hasCustom = pageList.some(
                  (p) => (p.pagePath.replace(/\/$/, '') || '/') === prodPath && p.title
                );
                return (
                  <option key={prod.id || prod.slug} value={prodPath} className="text-stone-800 py-1.5 font-normal">
                    {hasCustom ? '✨ ' : ''}Outfit: {prod.title} ({prod.price}) — {prodPath}
                  </option>
                );
              })}
            </optgroup>
          )}
        </select>
      </div>

      {/* Quick Search & Filter Outfits Grid */}
      {products.length > 0 && (
        <div className="mt-4 pt-4 border-t border-stone-100 space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <span className="text-xs font-bold text-stone-700">
              Quick Select From Catalog Outfits ({filteredProducts.length}):
            </span>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search outfits by name..."
                value={productSearch}
                onChange={(e) => {
                  setProductSearch(e.target.value);
                  setProductPage(1);
                }}
                className="bg-[#FAF8F5] border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-[#8b1828]"
              />

              {allCategories.length > 2 && (
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => {
                    setSelectedCategoryFilter(e.target.value);
                    setProductPage(1);
                  }}
                  className="bg-[#FAF8F5] border border-stone-200 rounded-lg px-2 py-1.5 text-xs text-stone-700 focus:outline-none focus:border-[#8b1828] cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  {allCategories
                    .filter((c) => c !== 'all')
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              )}
            </div>
          </div>

          {/* Product Items Grid */}
          {paginatedProducts.length === 0 ? (
            <div className="py-6 text-center text-xs text-stone-400 bg-[#FAF8F5] rounded-xl border border-dashed border-stone-200">
              No products found matching &ldquo;{productSearch}&rdquo;.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {paginatedProducts.map((prod) => {
                const prodPath = `/product/${prod.slug}`;
                const isSelected = selectedPagePath === prodPath;
                const hasCustom = pageList.some(
                  (p) => (p.pagePath.replace(/\/$/, '') || '/') === prodPath && p.title
                );
                return (
                  <div
                    key={prod.id || prod.slug}
                    className={`group flex items-center justify-between rounded-xl border p-2 text-xs transition-all ${
                      isSelected
                        ? 'bg-[#8b1828] text-white border-[#8b1828] shadow-xs'
                        : 'bg-[#FAF8F5] hover:bg-stone-50 hover:border-stone-300 text-stone-800 border-stone-200'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedPagePath(prodPath)}
                      className="flex items-center gap-2.5 flex-1 min-w-0 text-left cursor-pointer"
                      title={`Configure SEO for ${prod.title}`}
                    >
                      {prod.images && prod.images[0] ? (
                        <img
                          src={prod.images[0]}
                          alt={prod.title}
                          className="w-8 h-8 rounded-lg object-cover border border-black/10 shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-stone-200 flex items-center justify-center shrink-0 text-stone-400">
                          👗
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold truncate text-[11px] leading-tight">
                            {prod.title}
                          </p>
                          {hasCustom && (
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                isSelected ? 'bg-amber-300' : 'bg-emerald-600'
                              }`}
                              title="Custom SEO active"
                            />
                          )}
                        </div>
                        <p
                          className={`text-[10px] font-mono mt-0.5 ${
                            isSelected ? 'text-rose-200' : 'text-stone-500'
                          }`}
                        >
                          {prod.price}
                        </p>
                      </div>
                    </button>

                    <a
                      href={prodPath}
                      target="_blank"
                      rel="noreferrer"
                      title={`Open live product: ${prodPath}`}
                      className={`ml-1.5 p-1.5 rounded-lg transition-colors shrink-0 ${
                        isSelected
                          ? 'text-white/80 hover:text-white hover:bg-black/20'
                          : 'text-stone-400 hover:text-[#8b1828] hover:bg-stone-200/60'
                      }`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
              <span className="text-[11px] text-stone-500 font-mono">
                Showing Page {currentPageSafe} of {totalPages} ({filteredProducts.length} items)
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={currentPageSafe <= 1}
                  onClick={() => setProductPage((p) => Math.max(1, p - 1))}
                  className="px-2 py-1 rounded-lg border border-stone-200 hover:bg-stone-100 disabled:opacity-40 text-stone-700 cursor-pointer"
                >
                  Prev
                </button>
                <button
                  type="button"
                  disabled={currentPageSafe >= totalPages}
                  onClick={() => setProductPage((p) => Math.min(totalPages, p + 1))}
                  className="px-2 py-1 rounded-lg border border-stone-200 hover:bg-stone-100 disabled:opacity-40 text-stone-700 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
