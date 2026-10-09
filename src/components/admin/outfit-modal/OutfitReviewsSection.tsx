'use client';

import React from 'react';
import { Star, Plus, Trash2, MessageSquare } from 'lucide-react';
import { ProductReviewItem } from '../types';

interface OutfitReviewsSectionProps {
  reviews: ProductReviewItem[];
  showAddReview: boolean;
  setShowAddReview: (show: boolean | ((prev: boolean) => boolean)) => void;
  revAuthor: string;
  setRevAuthor: (val: string) => void;
  revCity: string;
  setRevCity: (val: string) => void;
  revRating: number;
  setRevRating: (val: number) => void;
  revComment: string;
  setRevComment: (val: string) => void;
  revImage: string;
  setRevImage: (val: string) => void;
  revTag: string;
  setRevTag: (val: string) => void;
  onAddReview: () => void;
  onRemoveReview: (index: number) => void;
}

export default function OutfitReviewsSection({
  reviews,
  showAddReview,
  setShowAddReview,
  revAuthor,
  setRevAuthor,
  revCity,
  setRevCity,
  revRating,
  setRevRating,
  revComment,
  setRevComment,
  revImage,
  setRevImage,
  revTag,
  setRevTag,
  onAddReview,
  onRemoveReview,
}: OutfitReviewsSectionProps) {
  return (
    <div className="bg-white border border-[#EBE3D7] rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 font-bold text-xs">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          </div>
          <div>
            <h3 className="text-sm font-serif font-bold text-stone-900">
              Customer Reviews &amp; Testimonials
            </h3>
            <p className="text-[11px] text-stone-500">
              Add verified bride feedback, bridal photos, and star ratings to build trust
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold px-2.5 py-1 bg-stone-100 text-stone-600 rounded-full">
            {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
          </span>
          <button
            type="button"
            onClick={() => setShowAddReview(!showAddReview)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#8b1828]/10 hover:bg-[#8b1828] text-[#8b1828] hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showAddReview ? 'Close Form' : '+ Add Review'}</span>
          </button>
        </div>
      </div>

      {/* Form to add a new review */}
      {showAddReview && (
        <div className="bg-[#FAF8F5] border border-amber-200/80 rounded-2xl p-4 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8b1828]">
              Post New Customer Review
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRevRating(star)}
                  className="cursor-pointer p-0.5 hover:scale-110 transition-transform"
                  title={`${star} Star${star > 1 ? 's' : ''}`}
                >
                  <Star
                    className={`w-4 h-4 ${
                      star <= revRating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-amber-600 ml-1.5">
                {revRating}.0 / 5
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                Bride / Customer Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Jaspreet Kaur"
                value={revAuthor}
                onChange={(e) => setRevAuthor(e.target.value)}
                className="w-full bg-white border border-stone-200 focus:border-[#8b1828] rounded-xl py-2 px-3 text-xs text-stone-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                City / Event Location
              </label>
              <input
                type="text"
                placeholder="e.g. Chandigarh, PB"
                value={revCity}
                onChange={(e) => setRevCity(e.target.value)}
                className="w-full bg-white border border-stone-200 focus:border-[#8b1828] rounded-xl py-2 px-3 text-xs text-stone-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                Badge / Tag
              </label>
              <select
                value={revTag}
                onChange={(e) => setRevTag(e.target.value)}
                className="w-full bg-white border border-stone-200 focus:border-[#8b1828] rounded-xl py-2 px-3 text-xs text-stone-900 focus:outline-none cursor-pointer"
              >
                <option value="Verified Bride">Verified Bride</option>
                <option value="Wedding Day">Wedding Day</option>
                <option value="Reception Night">Reception Night</option>
                <option value="Sangeet Night">Sangeet Night</option>
                <option value="NRI Client">NRI Client</option>
                <option value="Bridesmaid">Bridesmaid</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
              Bride Photo URL (Optional)
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/... or uploaded photo link"
              value={revImage}
              onChange={(e) => setRevImage(e.target.value)}
              className="w-full bg-white border border-stone-200 focus:border-[#8b1828] rounded-xl py-2 px-3 text-xs text-stone-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
              Review / Experience *
            </label>
            <textarea
              rows={2}
              placeholder="Wore this for my Anand Karaj in Amritsar. Received endless compliments on the intricate zardozi embroidery and perfect fit..."
              value={revComment}
              onChange={(e) => setRevComment(e.target.value)}
              className="w-full bg-white border border-stone-200 focus:border-[#8b1828] rounded-xl py-2 px-3 text-xs text-stone-900 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddReview(false)}
              className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onAddReview}
              disabled={!revAuthor.trim() || !revComment.trim()}
              className="px-4 py-1.5 bg-[#8b1828] hover:bg-[#721320] disabled:bg-stone-300 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed"
            >
              Attach Review to Outfit
            </button>
          </div>
        </div>
      )}

      {/* List of existing reviews */}
      <div className="space-y-2.5">
        {reviews.length > 0 ? (
          reviews.map((rev, index) => (
            <div
              key={index}
              className="flex items-start justify-between gap-3 p-3.5 bg-[#FAF8F5] border border-stone-200 rounded-xl hover:border-stone-300 transition-colors"
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
                      <span className="text-[11px] text-stone-500">
                        • {rev.city}
                      </span>
                    )}
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                      {rev.tag || 'Verified Bride'}
                    </span>
                    <span className="text-[11px] text-stone-400 ml-auto">
                      {rev.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mb-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
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
                onClick={() => onRemoveReview(index)}
                className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                title="Delete Review"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-6 border border-dashed border-stone-200 rounded-xl bg-stone-50/50">
            <MessageSquare className="w-7 h-7 text-stone-300 mx-auto mb-1.5" />
            <p className="text-xs font-medium text-stone-500">
              No custom reviews posted for this outfit yet.
            </p>
            <p className="text-[11px] text-stone-400 mt-0.5">
              Click <strong>+ Add Review</strong> above to add customer testimonials for this outfit.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
