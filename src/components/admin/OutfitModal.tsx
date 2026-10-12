'use client';

import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { OutfitItem } from './types';
import OutfitBasicPricingSection from './outfit-modal/OutfitBasicPricingSection';
import OutfitGallerySection from './outfit-modal/OutfitGallerySection';
import OutfitCraftDetailsSection from './outfit-modal/OutfitCraftDetailsSection';

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

  if (!isOpen) return null;

  // Swap / Move image positions helper
  const moveImage = (fromIdx: number, toIdx: number) => {
    const list = [...(formData.images || [])];
    if (fromIdx < 0 || fromIdx >= list.length || toIdx < 0 || toIdx >= list.length || fromIdx === toIdx) return;
    const [movedItem] = list.splice(fromIdx, 1);
    list.splice(toIdx, 0, movedItem);
    setFormData((prev) => ({ ...prev, images: list }));
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
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const list = [...(formData.images || [])];
    const [draggedItem] = list.splice(draggedIndex, 1);
    list.splice(dropIndex, 0, draggedItem);

    setFormData((prev) => ({ ...prev, images: list }));
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border border-[#EDE4D8] rounded-3xl max-w-4xl w-full shadow-2xl relative my-6 overflow-hidden flex flex-col max-h-[92vh]">
        {/* 🌟 HEADER */}
        <div className="px-6 sm:px-8 py-5 bg-gradient-to-r from-[#FAF8F5] via-white to-[#FAF8F5] border-b border-[#EDE4D8] flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8b1828] bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200/60">
                {editingProduct ? 'Update Design' : 'New Collection'}
              </span>
              <span className="text-xs text-stone-400">• Luxury Bridal & Groom</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">
              {editingProduct ? `Edit: ${editingProduct.title}` : 'Add New Designer Outfit'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 📝 SCROLLABLE FORM BODY */}
        <form onSubmit={handleSaveProduct} className="p-6 sm:p-8 space-y-7 overflow-y-auto flex-1">
          {/* Section 1: Basic Info & Pricing */}
          <OutfitBasicPricingSection formData={formData} setFormData={setFormData} />

          {/* Section 2 & 3: Photos Gallery & Reordering */}
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

          {/* 🏁 STICKY BOTTOM ACTIONS */}
          <div className="pt-4 flex items-center justify-between border-t border-[#EDE4D8]">
            <p className="text-[11px] text-stone-500 hidden sm:block">
              Ensure high-resolution photos and accurate rental pricing before saving.
            </p>
            <div className="flex items-center gap-3 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#8b1828] to-[#6a111e] hover:from-[#721320] hover:to-[#550d18] text-white font-bold text-xs shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{editingProduct ? 'Save All Changes' : 'Publish Outfit'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
