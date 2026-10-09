'use client';

import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { OutfitItem, ProductReviewItem } from './types';
import OutfitBasicPricingSection from './outfit-modal/OutfitBasicPricingSection';
import OutfitGallerySection from './outfit-modal/OutfitGallerySection';
import OutfitCraftDetailsSection from './outfit-modal/OutfitCraftDetailsSection';
import OutfitReviewsSection from './outfit-modal/OutfitReviewsSection';

interface OutfitModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct: OutfitItem | null;
  formData: Partial<OutfitItem>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<OutfitItem>>>;
  uploadingImage: boolean;
  imageError: string;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveProduct: (e: React.FormEvent) => void;
}

export default function OutfitModal({
  isOpen,
  onClose,
  editingProduct,
  formData,
  setFormData,
  uploadingImage,
  imageError,
  handleImageUpload,
  handleSaveProduct,
}: OutfitModalProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // State for adding a new customer review to this outfit
  const [showAddReview, setShowAddReview] = useState(false);
  const [revAuthor, setRevAuthor] = useState('');
  const [revCity, setRevCity] = useState('');
  const [revRating, setRevRating] = useState<number>(5);
  const [revComment, setRevComment] = useState('');
  const [revImage, setRevImage] = useState('');
  const [revTag, setRevTag] = useState('Verified Bride');

  if (!isOpen) return null;

  // Swap / Move image positions helper
  const moveImage = (fromIdx: number, toIdx: number) => {
    const list = [...(formData.images || [])];
    if (fromIdx < 0 || fromIdx >= list.length || toIdx < 0 || toIdx >= list.length || fromIdx === toIdx) return;
    const [movedItem] = list.splice(fromIdx, 1);
    list.splice(toIdx, 0, movedItem);
    setFormData((prev) => ({ ...prev, images: list }));
  };

  // Add Review to this outfit
  const handleAddReviewToOutfit = () => {
    if (!revAuthor.trim() || !revComment.trim()) {
      alert('Please enter Client Name and Review Message!');
      return;
    }
    const newRev: ProductReviewItem = {
      author: revAuthor.trim(),
      city: revCity.trim() || 'Punjab',
      date: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }),
      rating: revRating,
      comment: revComment.trim(),
      image: revImage.trim() || undefined,
      tag: revTag,
    };
    setFormData((prev) => ({
      ...prev,
      reviews: [newRev, ...(prev.reviews || [])],
    }));
    // Reset form
    setRevAuthor('');
    setRevCity('');
    setRevComment('');
    setRevImage('');
    setRevRating(5);
    setShowAddReview(false);
  };

  // Remove Review from this outfit
  const handleRemoveReview = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      reviews: (prev.reviews || []).filter((_, i) => i !== index),
    }));
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    if (e.dataTransfer.setDragImage && e.currentTarget) {
      e.dataTransfer.setDragImage(e.currentTarget, 20, 20);
    }
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      moveImage(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border border-[#EDE4D8] rounded-3xl max-w-3xl w-full shadow-2xl relative my-6 overflow-hidden flex flex-col max-h-[92vh]">
        {/* 👑 LUXURY HEADER WITH BURGUNDY ACCENTS */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-[#FAF8F5] via-white to-[#FAF8F5] border-b border-[#EDE4D8] flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8b1828] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60">
                {editingProduct ? 'EDIT COUTURE PIECE' : 'NEW CATALOG OUTFIT'}
              </span>
              {formData.status && (
                <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {formData.status}
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 tracking-tight mt-0.5 line-clamp-1">
              {editingProduct?.title || 'Add Handcrafted Outfit to Catalog'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-all cursor-pointer border border-stone-200 shrink-0"
            title="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 📜 SCROLLABLE FORM BODY */}
        <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6">
          {/* Section 1 & 2: Basic Info, Category & Pricing */}
          <OutfitBasicPricingSection formData={formData} setFormData={setFormData} />

          {/* Section 3: Multi-Image Upload & Drag & Drop Gallery */}
          <OutfitGallerySection
            formData={formData}
            setFormData={setFormData}
            uploadingImage={uploadingImage}
            imageError={imageError}
            handleImageUpload={handleImageUpload}
            draggedIndex={draggedIndex}
            dragOverIndex={dragOverIndex}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDragEnd={handleDragEnd}
            handleDrop={handleDrop}
            moveImage={moveImage}
          />

          {/* Section 4 & 5: Craftsmanship Details & Description */}
          <OutfitCraftDetailsSection formData={formData} setFormData={setFormData} />

          {/* Section 6: Customer Reviews & Testimonials */}
          <OutfitReviewsSection
            reviews={formData.reviews || []}
            showAddReview={showAddReview}
            setShowAddReview={setShowAddReview}
            revAuthor={revAuthor}
            setRevAuthor={setRevAuthor}
            revCity={revCity}
            setRevCity={setRevCity}
            revRating={revRating}
            setRevRating={setRevRating}
            revComment={revComment}
            setRevComment={setRevComment}
            revImage={revImage}
            setRevImage={setRevImage}
            revTag={revTag}
            setRevTag={setRevTag}
            onAddReview={handleAddReviewToOutfit}
            onRemoveReview={handleRemoveReview}
          />

          {/* 🏁 STICKY BOTTOM ACTIONS */}
          <div className="pt-4 flex items-center justify-between border-t border-[#EDE4D8]">
            <p className="text-[11px] text-stone-500 hidden sm:block">
              Changes sync live across Catalog, Product Detail, and Schema JSON-LD.
            </p>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50 rounded-xl text-xs font-bold text-stone-700 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-[#8b1828] hover:bg-[#721320] text-white px-6 py-2.5 rounded-xl text-xs font-bold tracking-wide uppercase transition-all shadow-md shadow-[#8b1828]/25 hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <Save className="w-4 h-4 text-white" />
                <span>Save Outfit</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
