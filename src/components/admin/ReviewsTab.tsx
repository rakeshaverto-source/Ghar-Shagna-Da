'use client';

import React, { useState } from 'react';
import { HomeReviewItem } from './types';
import {
  Star,
  Plus,
  Trash2,
  Edit3,
  Search,
  CheckCircle2,
  RefreshCw,
  MessageSquare,
  Eye,
  EyeOff,
  X,
  Save,
} from 'lucide-react';

interface ReviewsTabProps {
  reviews: HomeReviewItem[];
  loadingReviews: boolean;
  onRefreshReviews: () => Promise<void>;
  onCreateReview: (review: Partial<HomeReviewItem>) => Promise<void>;
  onUpdateReview: (review: HomeReviewItem) => Promise<void>;
  onDeleteReview: (id: string) => Promise<void>;
}

export default function ReviewsTab({
  reviews,
  loadingReviews,
  onRefreshReviews,
  onCreateReview,
  onUpdateReview,
  onDeleteReview,
}: ReviewsTabProps) {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<HomeReviewItem | null>(null);

  // Form State
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState('');
  const [tag, setTag] = useState('Verified Bride');
  const [productTitle, setProductTitle] = useState('');
  const [isFeatured, setIsFeatured] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openAddModal = () => {
    setEditingReview(null);
    setAuthor('');
    setCity('Punjab');
    setRating(5);
    setComment('');
    setImage('');
    setTag('Verified Bride');
    setProductTitle('');
    setIsFeatured(true);
    setIsModalOpen(true);
  };

  const openEditModal = (rev: HomeReviewItem) => {
    setEditingReview(rev);
    setAuthor(rev.author);
    setCity(rev.city || 'Punjab');
    setRating(rev.rating || 5);
    setComment(rev.comment);
    setImage(rev.image || '');
    setTag(rev.tag || 'Verified Bride');
    setProductTitle(rev.productTitle || '');
    setIsFeatured(rev.isFeatured !== false);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      alert('Please enter bride/customer name and review message.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingReview && editingReview._id) {
        await onUpdateReview({
          ...editingReview,
          author: author.trim(),
          city: city.trim(),
          rating,
          comment: comment.trim(),
          image: image.trim(),
          tag,
          productTitle: productTitle.trim(),
          isFeatured,
        });
      } else {
        await onCreateReview({
          author: author.trim(),
          city: city.trim(),
          rating,
          comment: comment.trim(),
          image: image.trim(),
          tag,
          productTitle: productTitle.trim(),
          isFeatured,
        });
      }
      setIsModalOpen(false);
    } catch {
      alert('Failed to save review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.author.toLowerCase().includes(q) ||
      (r.city && r.city.toLowerCase().includes(q)) ||
      r.comment.toLowerCase().includes(q) ||
      (r.productTitle && r.productTitle.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-5">
      {/* Top Banner / Stats Header */}
      <div className="bg-white p-5 rounded-2xl border border-[#EDE4D8] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8b1828] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60">
              Home Page Reviews
            </span>
            <span className="text-xs text-stone-500 font-bold">
              {reviews.length} Total Testimonials
            </span>
          </div>
          <h2 className="text-lg font-serif font-bold text-stone-900 mt-1">
            Manage Client Testimonials &amp; Bride Stories
          </h2>
          <p className="text-xs text-stone-500">
            Reviews added here appear live on the Home Page customer review slider.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={onRefreshReviews}
            className="p-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 cursor-pointer transition-colors"
            title="Refresh from MongoDB"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#8b1828] hover:bg-[#721320] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-[#8b1828]/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Home Review</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search reviews by client name, city, outfit, or comments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-stone-200 rounded-xl py-2.5 pl-10 pr-4 text-xs text-stone-900 focus:outline-none focus:border-[#8b1828]"
        />
      </div>

      {/* Reviews Cards Grid */}
      {loadingReviews ? (
        <div className="p-16 text-center text-stone-500 bg-white rounded-2xl border border-[#EDE4D8]">
          <RefreshCw className="w-7 h-7 animate-spin mx-auto mb-2 text-[#8b1828]" />
          <p className="text-xs font-medium">Loading reviews from MongoDB Atlas...</p>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="p-16 text-center text-stone-500 bg-white rounded-2xl border border-[#EDE4D8] space-y-2">
          <MessageSquare className="w-10 h-10 text-stone-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-stone-800">No reviews found</p>
          <p className="text-xs text-stone-400">Click &ldquo;+ Add Home Review&rdquo; to create the first one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReviews.map((rev) => (
            <div
              key={rev._id}
              className="bg-white rounded-2xl border border-[#EDE4D8] p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow group relative"
            >
              <div>
                {/* Header: Photo + Name + Badge */}
                <div className="flex items-start gap-3 mb-3">
                  {rev.image ? (
                    <img
                      src={rev.image}
                      alt={rev.author}
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-300 shrink-0 shadow-xs"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#8b1828]/10 text-[#8b1828] font-bold text-sm flex items-center justify-center shrink-0">
                      {rev.author.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-sm font-bold text-stone-900 truncate">
                        {rev.author}
                      </h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full shrink-0">
                        {rev.tag || 'Verified Bride'}
                      </span>
                    </div>

                    <p className="text-[11px] text-stone-500 truncate">
                      {rev.city} • {rev.date}
                    </p>

                    {rev.productTitle && (
                      <p className="text-[10px] text-[#8b1828] font-semibold truncate mt-0.5">
                        Outfit: {rev.productTitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Star Ratings */}
                <div className="flex items-center gap-1 mb-2.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                      }`}
                    />
                  ))}
                  <span className="text-[11px] font-bold text-amber-600 ml-1">
                    {rev.rating}.0
                  </span>
                </div>

                {/* Comment Text */}
                <p className="text-xs text-stone-700 leading-relaxed italic line-clamp-4">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Action Bar */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    rev.isFeatured !== false
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {rev.isFeatured !== false ? '✨ Featured on Home' : 'Hidden'}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openEditModal(rev)}
                    className="p-1.5 text-stone-600 hover:text-[#8b1828] hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Edit Review"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete review from "${rev.author}"?`)) {
                        onDeleteReview(rev._id!);
                      }
                    }}
                    className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white border border-[#EDE4D8] rounded-3xl max-w-xl w-full shadow-2xl relative my-6 overflow-hidden flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#FAF8F5] via-white to-[#FAF8F5] border-b border-[#EDE4D8] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8b1828] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60">
                  {editingReview ? 'EDIT TESTIMONIAL' : 'NEW HOME TESTIMONIAL'}
                </span>
                <h3 className="text-base font-serif font-bold text-stone-900 mt-0.5">
                  {editingReview ? `Edit Review for ${editingReview.author}` : 'Post Review to Home Page Slider'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs overflow-y-auto flex-1">
              {/* Star Picker */}
              <div className="flex items-center justify-between p-3 bg-[#FAF8F5] border border-amber-200/80 rounded-2xl">
                <span className="font-bold text-stone-700 uppercase tracking-wider text-[11px]">
                  Select Star Rating:
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Client / Bride Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jaspreet Kaur"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-[#8b1828] bg-[#FAF8F5] focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Chandigarh, PB"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-[#8b1828] bg-[#FAF8F5] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Badge / Tag</label>
                  <select
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-[#8b1828] bg-[#FAF8F5] cursor-pointer"
                  >
                    <option value="Verified Bride">Verified Bride</option>
                    <option value="Verified Couple">Verified Couple</option>
                    <option value="Wedding Day">Wedding Day</option>
                    <option value="Reception Night">Reception Night</option>
                    <option value="Sangeet Special">Sangeet Special</option>
                    <option value="Verified Client">Verified Client</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Outfit Rented (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Royal Crimson Velvet Lehenga"
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-[#8b1828] bg-[#FAF8F5] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700">Customer Photo URL (Optional)</label>
                <input
                  type="text"
                  placeholder="https://... or choose from quick picks below"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-[#8b1828] bg-[#FAF8F5] focus:bg-white"
                />
                <div className="pt-1 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-stone-400">Quick Pick:</span>
                  {[
                    { label: 'Bride 1', url: '/hero-bride.jpg' },
                    { label: 'Lehenga 2', url: '/hero-lehenga.jpg' },
                    { label: 'Gown 3', url: '/hero-gown.jpg' },
                    { label: 'Groom 4', url: '/creative-groom.jpg' },
                  ].map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImage(p.url)}
                      className={`text-[10px] px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                        image === p.url
                          ? 'border-[#8b1828] bg-[#8b1828] text-white'
                          : 'border-stone-200 text-stone-600 hover:border-stone-400'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700">Review Message / Story *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe bride's experience, fitting, dry-cleaning hygiene and compliments received..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-[#8b1828] bg-[#FAF8F5] focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="feat-check"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-[#8b1828] focus:ring-[#8b1828]"
                />
                <label htmlFor="feat-check" className="font-semibold text-stone-700 cursor-pointer">
                  Feature on Home Page Carousel
                </label>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 font-semibold hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !author.trim() || !comment.trim()}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#8b1828] hover:bg-[#721320] text-white font-semibold shadow-md active:scale-95 transition-all cursor-pointer disabled:bg-stone-300"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Saving...' : editingReview ? 'Update Review' : 'Save Review'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
