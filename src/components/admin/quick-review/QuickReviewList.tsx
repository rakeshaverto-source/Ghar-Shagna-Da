'use client';

import React from 'react';
import { ProductReviewItem } from '../types';
import { Star, Trash2, MessageSquare } from 'lucide-react';

interface QuickReviewListProps {
  reviews: ProductReviewItem[];
  isSubmitting: boolean;
  onDeleteReview: (index: number) => void;
}

export default function QuickReviewList({
  reviews,
  isSubmitting,
  onDeleteReview,
}: QuickReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-10 border border-dashed border-stone-200 rounded-2xl bg-stone-50/50 space-y-2">
        <MessageSquare className="w-8 h-8 text-stone-300 mx-auto" />
        <p className="text-xs font-semibold text-stone-600">
          No reviews posted for this outfit yet.
        </p>
        <p className="text-[11px] text-stone-400 max-w-sm mx-auto">
          Click the <strong>+ Post Review</strong> button above to immediately add customer testimonials and ratings.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {reviews.map((rev, index) => (
        <div
          key={index}
          className="flex items-start justify-between gap-3 p-3.5 bg-[#FAF8F5] border border-stone-200 rounded-2xl hover:border-stone-300 transition-colors"
        >
          <div className="flex items-start gap-3 min-w-0 flex-1">
            {rev.image ? (
              <img
                src={rev.image}
                alt={rev.author}
                className="w-10 h-10 rounded-full object-cover border border-amber-300 shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#8b1828]/10 text-[#8b1828] font-bold text-xs flex items-center justify-center shrink-0">
                {rev.author.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-xs font-bold text-stone-900 truncate">
                  {rev.author}
                </span>
                {rev.city && (
                  <span className="text-[11px] text-stone-500">• {rev.city}</span>
                )}
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                  {rev.tag || 'Verified Bride'}
                </span>
                <span className="text-[11px] text-stone-400 ml-auto">{rev.date}</span>
              </div>

              <div className="flex items-center gap-1 mb-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3.5 h-3.5 ${
                      s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>

              <p className="text-xs text-stone-700 leading-relaxed italic">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => onDeleteReview(index)}
            className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0 disabled:opacity-40"
            title="Delete Review"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
