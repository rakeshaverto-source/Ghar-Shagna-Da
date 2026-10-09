'use client';

import React from 'react';
import Image from 'next/image';
import { X, UploadCloud, Save, CheckCircle2, Monitor, Smartphone } from 'lucide-react';
import { HeroSlideItem } from './types';

interface HeroSlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingHeroSlide: HeroSlideItem | null;
  heroFormData: Partial<HeroSlideItem>;
  setHeroFormData: React.Dispatch<React.SetStateAction<Partial<HeroSlideItem>>>;
  uploadingImage: boolean;
  handleHeroImageUpload: (e: React.ChangeEvent<HTMLInputElement>, type: 'desktop' | 'mobile') => void;
  handleSaveHeroSlide: (e: React.FormEvent) => void;
}

export default function HeroSlideModal({
  isOpen,
  onClose,
  editingHeroSlide,
  heroFormData,
  setHeroFormData,
  uploadingImage,
  handleHeroImageUpload,
  handleSaveHeroSlide,
}: HeroSlideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-[#EDE4D8] rounded-3xl max-xl w-full max-w-xl p-6 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8b1828] block">
            {editingHeroSlide ? 'Edit Hero Banner Slide' : 'Add New Hero Banner Slide'}
          </span>
          <h2 className="text-xl font-bold text-stone-900">
            {editingHeroSlide ? 'Update Slide Media & Headings' : 'New Homepage Slide'}
          </h2>
        </div>

        <form onSubmit={handleSaveHeroSlide} className="space-y-4">
          {/* Desktop Image with Cloudinary & Live Thumbnail Preview */}
          <div className="bg-[#FAF8F5] border border-dashed border-stone-300 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <Monitor className="w-3.5 h-3.5 text-[#8b1828]" />
                <span>Desktop Banner Image (1920×1080) *</span>
              </label>
              {heroFormData.desktopImage && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Desktop Ready</span>
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <label className="inline-flex items-center justify-center gap-2 bg-white border border-stone-200 hover:border-[#8b1828] text-stone-700 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer shadow-xs transition-colors shrink-0">
                <UploadCloud className="w-3.5 h-3.5 text-[#8b1828]" />
                <span>{uploadingImage ? 'Uploading...' : 'Upload Desktop Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleHeroImageUpload(e, 'desktop')}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
              <input
                type="text"
                required
                placeholder="/creative-bridal.jpg or Cloudinary URL"
                value={heroFormData.desktopImage || ''}
                onChange={(e) => setHeroFormData({ ...heroFormData, desktopImage: e.target.value })}
                className="flex-1 bg-white border border-stone-200 rounded-xl py-1.5 px-3 text-xs text-stone-900 font-mono"
              />
            </div>

            {/* Desktop Preview */}
            {Boolean(heroFormData.desktopImage) && (
              <div className="pt-2 flex items-center gap-3 border-t border-stone-200/60">
                <div className="relative w-28 h-16 rounded-xl border border-stone-300 overflow-hidden bg-stone-100 shadow-xs shrink-0">
                  <Image
                    src={heroFormData.desktopImage!}
                    alt="Desktop Banner Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold text-stone-500 block">
                    Desktop Aspect Preview:
                  </span>
                  <p className="text-[11px] font-mono text-stone-700 truncate mt-0.5">
                    {heroFormData.desktopImage}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Image with Cloudinary & Live Thumbnail Preview */}
          <div className="bg-[#FAF8F5] border border-dashed border-stone-300 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-[#8b1828]" />
                <span>Mobile Banner Image (1080×1920) *</span>
              </label>
              {heroFormData.mobileImage && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Mobile Ready</span>
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <label className="inline-flex items-center justify-center gap-2 bg-white border border-stone-200 hover:border-[#8b1828] text-stone-700 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer shadow-xs transition-colors shrink-0">
                <UploadCloud className="w-3.5 h-3.5 text-[#8b1828]" />
                <span>{uploadingImage ? 'Uploading...' : 'Upload Mobile Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleHeroImageUpload(e, 'mobile')}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
              <input
                type="text"
                required
                placeholder="/mobile-bridal.jpg or Cloudinary URL"
                value={heroFormData.mobileImage || ''}
                onChange={(e) => setHeroFormData({ ...heroFormData, mobileImage: e.target.value })}
                className="flex-1 bg-white border border-stone-200 rounded-xl py-1.5 px-3 text-xs text-stone-900 font-mono"
              />
            </div>

            {/* Mobile Preview */}
            {Boolean(heroFormData.mobileImage) && (
              <div className="pt-2 flex items-center gap-3 border-t border-stone-200/60">
                <div className="relative w-12 h-20 rounded-xl border border-stone-300 overflow-hidden bg-stone-100 shadow-xs shrink-0">
                  <Image
                    src={heroFormData.mobileImage!}
                    alt="Mobile Banner Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold text-stone-500 block">
                    Mobile Vertical Preview:
                  </span>
                  <p className="text-[11px] font-mono text-stone-700 truncate mt-0.5">
                    {heroFormData.mobileImage}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Heading Prefix</label>
              <input
                type="text"
                required
                placeholder="e.g. SHAGNA DI"
                value={heroFormData.headingPrefix || ''}
                onChange={(e) => setHeroFormData({ ...heroFormData, headingPrefix: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl py-2 px-3 text-xs text-stone-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Heading Highlight</label>
              <input
                type="text"
                required
                placeholder="e.g. Raat / Dulha"
                value={heroFormData.headingHighlight || ''}
                onChange={(e) => setHeroFormData({ ...heroFormData, headingHighlight: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl py-2 px-3 text-xs text-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Sub-tagline (Description)</label>
            <input
              type="text"
              placeholder="e.g. Khaas lamhon ke liye, sabse khoobsurat bridal lehengas on rent."
              value={heroFormData.subtagline || ''}
              onChange={(e) => setHeroFormData({ ...heroFormData, subtagline: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl py-2 px-3 text-xs text-stone-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Button Text</label>
              <input
                type="text"
                placeholder="Explore Bridal Rentals"
                value={heroFormData.ctaText || ''}
                onChange={(e) => setHeroFormData({ ...heroFormData, ctaText: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl py-2 px-3 text-xs text-stone-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Button Link URL</label>
              <input
                type="text"
                placeholder="/category/bridal-lehengas"
                value={heroFormData.ctaLink || ''}
                onChange={(e) => setHeroFormData({ ...heroFormData, ctaLink: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl py-2 px-3 text-xs text-stone-900"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#8b1828] hover:bg-[#721320] text-white px-5 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-md active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Slide</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
