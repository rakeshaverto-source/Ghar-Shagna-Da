'use client';

import React from 'react';
import Image from 'next/image';
import {
  UploadCloud,
  ImageIcon,
  GripVertical,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { OutfitItem } from '../types';

interface OutfitGallerySectionProps {
  formData: Partial<OutfitItem>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<OutfitItem>>>;
  uploadingImage: boolean;
  imageError: string;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  draggedIndex: number | null;
  dragOverIndex: number | null;
  handleDragStart: (e: React.DragEvent, index: number) => void;
  handleDragOver: (e: React.DragEvent, index: number) => void;
  handleDragEnd: () => void;
  handleDrop: (e: React.DragEvent, index: number) => void;
  moveImage: (fromIdx: number, toIdx: number) => void;
}

export default function OutfitGallerySection({
  formData,
  setFormData,
  uploadingImage,
  imageError,
  handleImageUpload,
  draggedIndex,
  dragOverIndex,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  handleDrop,
  moveImage,
}: OutfitGallerySectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700">
          <ImageIcon className="w-3.5 h-3.5 text-[#8b1828]" />
          <span>Outfit Imagery &amp; Photo Gallery ({(formData.images || []).length} Photos)</span>
        </div>
        <span className="text-[11px] text-stone-400">Select multiple photos at once</span>
      </div>

      <div className="bg-[#FAF8F5] border border-dashed border-[#EDE4D8] rounded-2xl p-4 sm:p-5 space-y-4 transition-all hover:border-[#8b1828]/40">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <label className="inline-flex items-center justify-center gap-2 bg-[#8b1828] hover:bg-[#721320] text-white px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer shadow-md shadow-[#8b1828]/20 transition-all active:scale-95 shrink-0">
            <UploadCloud className="w-4 h-4 text-white" />
            <span>{uploadingImage ? 'Uploading Photos...' : 'Upload Photos (Multi-Select)'}</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={uploadingImage}
              className="hidden"
            />
          </label>

          <div className="flex items-center gap-2 flex-1">
            <span className="text-[11px] font-semibold text-stone-400 shrink-0">or add URL:</span>
            <input
              type="text"
              id="new-image-url-input"
              placeholder="Paste image URL (e.g. /products/... or https://...) and press Add"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const val = (e.currentTarget.value || '').trim();
                  if (val) {
                    setFormData((prev) => ({
                      ...prev,
                      images: [...(prev.images || []).filter(Boolean), val],
                    }));
                    e.currentTarget.value = '';
                  }
                }
              }}
              className="flex-1 bg-white border border-stone-200 rounded-xl py-2 px-3 text-xs text-stone-900 focus:outline-none focus:border-[#8b1828] font-mono"
            />
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById('new-image-url-input') as HTMLInputElement | null;
                if (input && input.value.trim()) {
                  const val = input.value.trim();
                  setFormData((prev) => ({
                    ...prev,
                    images: [...(prev.images || []).filter(Boolean), val],
                  }));
                  input.value = '';
                }
              }}
              className="px-3 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 cursor-pointer transition-colors"
            >
              + Add
            </button>
          </div>
        </div>

        {imageError && (
          <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {imageError}
          </div>
        )}

        {/* Multi-Photo Grid */}
        {Boolean(formData.images && formData.images.length > 0) ? (
          <div className="space-y-2 pt-2 border-t border-stone-200/60">
            <div className="flex items-center justify-between text-[11px] text-stone-500 font-semibold">
              <span className="flex items-center gap-1.5">
                <GripVertical className="w-3.5 h-3.5 text-[#8b1828]" />
                <span>Drag cards to reorder, or use arrows (1st photo is Cover):</span>
              </span>
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, images: [] }))}
                className="text-red-600 hover:text-red-700 hover:underline cursor-pointer"
              >
                Remove All
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {formData.images!.map((imgUrl, index) => {
                const isCover = index === 0;
                const isDragging = draggedIndex === index;
                const isOver = dragOverIndex === index;
                const totalCount = formData.images!.length;

                return (
                  <div
                    key={`${imgUrl}-${index}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`group relative rounded-xl border-2 overflow-hidden bg-stone-100 shadow-xs transition-all cursor-grab active:cursor-grabbing select-none ${
                      isDragging
                        ? 'opacity-40 scale-95 border-dashed border-stone-400'
                        : isOver
                        ? 'ring-4 ring-[#8b1828]/40 border-[#8b1828] scale-105 z-10'
                        : isCover
                        ? 'border-[#8b1828] ring-2 ring-[#8b1828]/20'
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <div className="relative aspect-3/4 w-full pointer-events-none">
                      <Image
                        src={imgUrl}
                        alt={`Outfit Image ${index + 1}`}
                        fill
                        className="object-cover pointer-events-none"
                      />
                    </div>

                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <div className="bg-white/90 text-stone-800 rounded-lg p-1.5 shadow-md flex items-center gap-1 text-[10px] font-bold">
                        <GripVertical className="w-3.5 h-3.5 text-[#8b1828]" />
                        <span>Drag</span>
                      </div>
                    </div>

                    {isCover ? (
                      <span className="absolute top-1 left-1 bg-[#8b1828] text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded shadow-xs z-10">
                        Cover
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveImage(index, 0);
                        }}
                        className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 bg-black/80 hover:bg-[#8b1828] text-white text-[9px] font-bold px-1.5 py-0.5 rounded transition-all cursor-pointer z-10"
                        title="Set as Cover Photo"
                      >
                        Set Cover
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const updated = (formData.images || []).filter((_, i) => i !== index);
                        setFormData((prev) => ({ ...prev, images: updated }));
                      }}
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-red-600/90 hover:bg-red-700 text-white w-5 h-5 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs z-10"
                      title="Remove Photo"
                    >
                      <X className="w-3 h-3" />
                    </button>

                    <div className="px-1.5 py-1 bg-white/95 text-[9px] font-mono text-stone-600 flex items-center justify-between border-t border-stone-200 z-10 relative">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          moveImage(index, index - 1);
                        }}
                        className="p-0.5 rounded hover:bg-stone-200 disabled:opacity-20 text-stone-700 cursor-pointer disabled:cursor-not-allowed"
                        title="Move photo left"
                      >
                        <ChevronLeft className="w-3 h-3" />
                      </button>

                      <span className="font-bold text-[10px]">#{index + 1}</span>

                      <button
                        type="button"
                        disabled={index === totalCount - 1}
                        onClick={(e) => {
                          e.stopPropagation();
                          moveImage(index, index + 1);
                        }}
                        className="p-0.5 rounded hover:bg-stone-200 disabled:opacity-20 text-stone-700 cursor-pointer disabled:cursor-not-allowed"
                        title="Move photo right"
                      >
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="py-4 text-center text-xs text-stone-400 bg-white/60 rounded-xl border border-dashed border-stone-200">
            No images uploaded yet. Click &quot;Upload Photos&quot; to choose one or multiple images.
          </div>
        )}
      </div>
    </div>
  );
}
