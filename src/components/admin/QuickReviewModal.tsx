'use client';

import React, { useState } from 'react';
import { OutfitItem, ProductReviewItem } from './types';
import { Star, Plus, Trash2, X, MessageSquare, CheckCircle2 } from 'lucide-react';

interface QuickReviewModalProps {
  product: OutfitItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProductReviews: (productId: string, updatedReviews: ProductReviewItem[]) => Promise<void>;
}

export default function QuickReviewModal({
  product,
  isOpen,
  onClose,
  onUpdateProductReviews,
}: QuickReviewModalProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState('');
  const [tag, setTag] = useState('Verified Bride');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !product) return null;

  const currentReviews = product.reviews || [];

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      alert('Please enter bride/customer name and review message.');
      return;
    }

    const newReview: ProductReviewItem = {
      author: author.trim(),
      city: city.trim() || 'Punjab',
      date: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }),
      rating,
      comment: comment.trim(),
      image: image.trim() || undefined,
      tag,
    };

    const updated = [newReview, ...currentReviews];
    setIsSubmitting(true);
    try {
      await onUpdateProductReviews(product._id || product.id, updated);
      setAuthor('');
      setCity('');
      setComment('');
      setImage('');
      setRating(5);
      setShowAddForm(false);
    } catch {
      alert('Failed to save review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (index: number) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    const updated = currentReviews.filter((_, i) => i !== index);
    setIsSubmitting(true);
    try {
      await onUpdateProductReviews(product._id || product.id, updated);
    } catch {
      alert('Failed to delete review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border border-[#EDE4D8] rounded-3xl max-w-2xl w-full shadow-2xl relative my-6 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
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
                  {currentReviews.length} {currentReviews.length === 1 ? 'Review' : 'Reviews'}
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
              onClick={() => setShowAddForm(!showAddForm)}
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {/* Add Review Form Dropdown */}
          {showAddForm && (
            <form
              onSubmit={handleAddReview}
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
                  onClick={() => setShowAddForm(false)}
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
          )}

          {/* List of Current Reviews */}
          <div className="space-y-2.5">
            {currentReviews.length > 0 ? (
              currentReviews.map((rev, index) => (
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
                    onClick={() => handleDeleteReview(index)}
                    className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0 disabled:opacity-40"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-10 border border-dashed border-stone-200 rounded-2xl bg-stone-50/50 space-y-2">
                <MessageSquare className="w-8 h-8 text-stone-300 mx-auto" />
                <p className="text-xs font-semibold text-stone-600">
                  No reviews posted for this outfit yet.
                </p>
                <p className="text-[11px] text-stone-400 max-w-sm mx-auto">
                  Click the <strong>+ Post Review</strong> button above to immediately add customer testimonials and ratings.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
