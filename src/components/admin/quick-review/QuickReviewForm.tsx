'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface QuickReviewFormProps {
  author: string;
  setAuthor: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
  rating: number;
  setRating: (val: number) => void;
  tag: string;
  setTag: (val: string) => void;
  image: string;
  setImage: (val: string) => void;
  comment: string;
  setComment: (val: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function QuickReviewForm({
  author,
  setAuthor,
  city,
  setCity,
  rating,
  setRating,
  tag,
  setTag,
  image,
  setImage,
  comment,
  setComment,
  isSubmitting,
  onSubmit,
  onCancel,
}: QuickReviewFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-[#FAF8F5] border border-amber-200/80 rounded-2xl p-4 sm:p-5 space-y-3 animate-in fade-in zoom-in-95 duration-200"
    >
      <div className="flex items-center justify-between pb-1 border-b border-stone-200/60">
        <span className="text-xs font-bold uppercase tracking-wider text-[#8b1828]">
          Post New Bride / Client Review
        </span>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="cursor-pointer p-0.5 hover:scale-110 transition-transform"
            >
              <Star
                className={`w-4 h-4 ${
                  star <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                }`}
              />
            </button>
          ))}
          <span className="text-xs font-bold text-amber-600 ml-1.5">{rating}.0 / 5</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
            Bride / Client Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Jaspreet Kaur"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full bg-white border border-stone-200 focus:border-[#8b1828] rounded-xl py-2 px-3 text-xs text-stone-900 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
            City / Location
          </label>
          <input
            type="text"
            placeholder="e.g. Chandigarh, PB"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-white border border-stone-200 focus:border-[#8b1828] rounded-xl py-2 px-3 text-xs text-stone-900 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
            Badge / Tag
          </label>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
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
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full bg-white border border-stone-200 focus:border-[#8b1828] rounded-xl py-2 px-3 text-xs text-stone-900 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
          Review / Testimonial *
        </label>
        <textarea
          rows={2}
          required
          placeholder="Fitting te look baare feedback likho..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full bg-white border border-stone-200 focus:border-[#8b1828] rounded-xl py-2 px-3 text-xs text-stone-900 focus:outline-none"
        />
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-800 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !author.trim() || !comment.trim()}
          className="px-4 py-1.5 bg-[#8b1828] hover:bg-[#721320] disabled:bg-stone-300 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
        >
          {isSubmitting ? 'Posting...' : 'Post Review Now'}
        </button>
      </div>
    </form>
  );
}
