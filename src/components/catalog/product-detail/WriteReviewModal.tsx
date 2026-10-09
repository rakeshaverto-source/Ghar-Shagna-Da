'use client';

import React from 'react';
import { ReviewItem } from './reviewsData';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: ReviewItem) => void;
}

export default function WriteReviewModal({
  isOpen,
  onClose,
  onSubmitReview,
}: WriteReviewModalProps) {
  const [newAuthor, setNewAuthor] = React.useState('');
  const [newCity, setNewCity] = React.useState('');
  const [newComment, setNewComment] = React.useState('');
  const [newRating, setNewRating] = React.useState(5);
  const [newImage, setNewImage] = React.useState('');
  const [newTag, setNewTag] = React.useState('Verified Bride');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;
    const newRev: ReviewItem = {
      author: newAuthor.trim(),
      city: newCity.trim() || 'Punjab',
      date: 'Just now',
      rating: Number(newRating) || 5,
      comment: newComment.trim(),
      image: newImage.trim() || undefined,
      tag: newTag || 'Verified Bride',
    };
    onSubmitReview(newRev);
    setNewAuthor('');
    setNewCity('');
    setNewComment('');
    setNewImage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-stone-200 pb-3">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#8b1828]">Customer Reviews</span>
            <h3 className="font-serif-luxury text-xl font-bold text-stone-900">Add Customer Review & Photo</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-stone-200 text-stone-500 hover:text-stone-900 hover:bg-stone-100 flex items-center justify-center font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-[#8b1828] bg-white cursor-pointer"
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
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-[#8b1828] bg-white cursor-pointer"
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
              placeholder="Fitting te look baare feedback likho..."
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
                  className={`text-[10.5px] px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
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
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 font-semibold hover:bg-stone-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#8b1828] hover:bg-[#6e121f] text-white font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
            >
              Post Review With Photo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
