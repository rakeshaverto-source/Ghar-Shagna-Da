'use client';

import React from 'react';
import { OutfitItem } from '../types';
import { Plus, X } from 'lucide-react';

interface QuickReviewHeaderProps {
  product: OutfitItem;
  reviewsCount: number;
  showAddForm: boolean;
  onToggleAddForm: () => void;
  onClose: () => void;
}

export default function QuickReviewHeader({
  product,
  reviewsCount,
  showAddForm,
  onToggleAddForm,
  onClose,
}: QuickReviewHeaderProps) {
  return (
    <div className="px-6 py-4 bg-gradient-to-r from-[#FAF8F5] via-white to-[#FAF8F5] border-b border-[#EDE4D8] flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        {product.images && product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-10 h-12 object-cover rounded-lg border border-stone-200 shrink-0"
          />
        ) : (
          <div className="w-10 h-12 rounded-lg bg-stone-100 flex items-center justify-center text-xs shrink-0">
            👗
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8b1828] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60">
              Customer Reviews
            </span>
            <span className="text-xs font-bold text-stone-500">
              {reviewsCount} {reviewsCount === 1 ? 'Review' : 'Reviews'}
            </span>
          </div>
          <h2 className="text-sm sm:text-base font-serif font-bold text-stone-900 line-clamp-1 mt-0.5">
            {product.title}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleAddForm}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#8b1828] hover:bg-[#721320] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{showAddForm ? 'Close' : '+ Post Review'}</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
