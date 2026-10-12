'use client';

import React, { useState, useRef } from 'react';
import { Star, Camera, Image as ImageIcon, Sparkles, CheckCircle2, X } from 'lucide-react';
import { ReviewItem } from './reviewsData';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: ReviewItem) => void;
  productTitle?: string;
  productImage?: string;
}

const RATING_DESCRIPTIONS: Record<number, { title: string; subtitle: string }> = {
  5: { title: 'Royal & Exceptional (5/5)', subtitle: 'Loved the fabric, fit, and royal elegance!' },
  4: { title: 'Very Good (4/5)', subtitle: 'Great experience & beautiful design' },
  3: { title: 'Average (3/5)', subtitle: 'Good look, minor alteration needed' },
  2: { title: 'Below Expectations (2/5)', subtitle: 'Fitting or fabric could be improved' },
  1: { title: 'Not Satisfied (1/5)', subtitle: 'Did not match expectations' },
};

export default function WriteReviewModal({
  isOpen,
  onClose,
  onSubmitReview,
  productTitle = 'Bridal Outfit',
  productImage,
}: WriteReviewModalProps) {
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleProcessFile = (file: File) => {
    if (file.size > 8 * 1024 * 1024) {
      alert('Photo size is too large (max 8MB). Please choose a smaller photo.');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setIsUploading(false);
    };
    reader.onerror = () => {
      alert('Could not read image file. Please try another.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleProcessFile(file);
    e.target.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      alert('Please enter your name and review feedback.');
      return;
    }

    const newRev: ReviewItem = {
      author: author.trim(),
      city: city.trim() || 'Punjab',
      date: 'Just now',
      rating: Number(rating) || 5,
      comment: comment.trim(),
      image: image.trim() || undefined,
      tag: 'Verified Bride',
    };

    onSubmitReview(newRev);
    setIsSubmittedSuccess(true);

    setTimeout(() => {
      setIsSubmittedSuccess(false);
      setAuthor('');
      setCity('');
      setComment('');
      setImage('');
      setRating(5);
      onClose();
    }, 1200);
  };

  const activeRating = hoverRating || rating;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 relative overflow-hidden flex flex-col max-h-[92vh] my-auto">
        {/* Luxury Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#FAF7F2] via-white to-[#FAF7F2] border-b border-[#EDE4D8] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {productImage ? (
              <img
                src={productImage}
                alt={productTitle}
                className="w-12 h-14 object-cover object-top rounded-xl border border-stone-200 shadow-xs shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#8b1828] shrink-0 font-serif-luxury font-bold text-lg">
                GS
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8b1828] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60">
                  Customer Review
                </span>
              </div>
              <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-stone-900 line-clamp-1 mt-0.5">
                Share Your Experience
              </h3>
              <p className="text-xs text-stone-500 line-clamp-1">{productTitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-all cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success Alert if submitted */}
        {isSubmittedSuccess ? (
          <div className="p-10 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-xl font-bold text-stone-900">
                Dhanvaad! Thank You for Your Review
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                Your review and photo will help upcoming brides find their dream wedding look!
              </p>
            </div>
          </div>
        ) : (
          /* Form Body */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
            {/* 1. Interactive Star Rating Card */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-amber-200/80 text-center space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block">
                How was your experience & outfit fitting? *
              </span>

              {/* Star buttons */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1.5 rounded-xl transition-all duration-150 hover:scale-125 active:scale-95 cursor-pointer focus:outline-none"
                    aria-label={`${star} Stars`}
                  >
                    <Star
                      className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                        star <= activeRating
                          ? 'fill-amber-400 text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.5)]'
                          : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Dynamic feedback text */}
              <div className="pt-1">
                <span className="text-xs font-bold text-stone-900">
                  {RATING_DESCRIPTIONS[activeRating]?.title}
                </span>
                <p className="text-[11px] text-stone-500">
                  {RATING_DESCRIPTIONS[activeRating]?.subtitle}
                </p>
              </div>
            </div>

            {/* 2. Customer Name & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                  Your Name / Bride Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jaspreet Kaur"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-[#8b1828] focus:ring-2 focus:ring-[#8b1828]/10 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none transition-all bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                  City / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chandigarh / Amritsar / Delhi"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-[#8b1828] focus:ring-2 focus:ring-[#8b1828]/10 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none transition-all bg-white"
                />
              </div>
            </div>

            {/* 3. Review Feedback Message */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                  Review & Feedback *
                </label>
                <span className="text-[10px] text-stone-400">
                  {comment.length} characters
                </span>
              </div>
              <textarea
                required
                rows={3}
                placeholder="Outfit fitting, embroidery te overall look kida laggia? Share your genuine feedback..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-stone-200 focus:border-[#8b1828] focus:ring-2 focus:ring-[#8b1828]/10 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none transition-all bg-white"
              />
            </div>

            {/* 4. Customer Photo Upload Section (Camera or Gallery) */}
            <div className="space-y-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 p-4">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-[#8b1828]" />
                  Add Photo of Your Outfit Look (Optional)
                </label>
                {image && (
                  <button
                    type="button"
                    onClick={() => setImage('')}
                    className="text-[11px] text-rose-600 hover:text-rose-800 font-bold underline cursor-pointer"
                  >
                    Remove Photo
                  </button>
                )}
              </div>

              {/* Hidden file inputs for Camera and Gallery */}
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Action buttons: Take Photo (Camera) OR Choose from Gallery */}
              {!image ? (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white border-2 border-dashed border-stone-300 hover:border-[#8b1828] hover:bg-rose-50/40 text-stone-700 transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-full bg-rose-50 text-[#8b1828] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                      <span className="text-xs font-bold block text-stone-900">Take Photo</span>
                      <span className="text-[10px] text-stone-500">Click with Camera</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white border-2 border-dashed border-stone-300 hover:border-[#8b1828] hover:bg-rose-50/40 text-stone-700 transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                      <span className="text-xs font-bold block text-stone-900">Choose Photo</span>
                      <span className="text-[10px] text-stone-500">From Phone Gallery</span>
                    </div>
                  </button>
                </div>
              ) : (
                /* Selected Photo Preview */
                <div className="p-3 bg-white rounded-2xl border border-stone-200 flex items-center gap-3.5 shadow-2xs">
                  <img
                    src={image}
                    alt="Customer outfit preview"
                    className="w-14 h-16 object-cover object-top rounded-xl border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-stone-900 block truncate">
                      Photo Added Successfully
                    </span>
                    <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      Will be shown with your review
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <button
                        type="button"
                        onClick={() => galleryInputRef.current?.click()}
                        className="text-[10px] font-semibold text-[#8b1828] hover:underline cursor-pointer"
                      >
                        Change Photo
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {isUploading && (
                <div className="text-center py-2 text-xs font-semibold text-[#8b1828] animate-pulse">
                  Uploading photo... please wait
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!author.trim() || !comment.trim()}
                className="px-6 py-2.5 rounded-xl bg-[#8b1828] hover:bg-[#721320] disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-bold text-xs shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Submit Review</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
