'use client';

import React from 'react';
import { Layers, FileText } from 'lucide-react';
import { OutfitItem } from '../types';

interface OutfitCraftDetailsSectionProps {
  formData: Partial<OutfitItem>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<OutfitItem>>>;
}

export default function OutfitCraftDetailsSection({
  formData,
  setFormData,
}: OutfitCraftDetailsSectionProps) {
  return (
    <>
      {/* 🧵 SECTION 4: FABRIC, WORK & CRAFTSMANSHIP DETAILS */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700">
          <Layers className="w-3.5 h-3.5 text-[#8b1828]" />
          <span>Craftsmanship, Color &amp; Rental Terms</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700">
              Fabric Details
            </label>
            <input
              type="text"
              placeholder="e.g. Micro Velvet with Pure Silk Dupattas"
              value={formData.fabric || ''}
              onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#8b1828] focus:bg-white rounded-xl py-2 px-3 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#8b1828]/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700">
              Embroidery / Work
            </label>
            <input
              type="text"
              placeholder="e.g. Handcrafted Zardozi, Dabka &amp; Tilla Needlework"
              value={formData.work || ''}
              onChange={(e) => setFormData({ ...formData, work: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#8b1828] focus:bg-white rounded-xl py-2 px-3 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#8b1828]/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700">
              Color Shade
            </label>
            <input
              type="text"
              placeholder="e.g. Crimson Red &amp; Antique Gold"
              value={formData.color || ''}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#8b1828] focus:bg-white rounded-xl py-2 px-3 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#8b1828]/20 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700">
              Rental Duration (Standard Booking)
            </label>
            <input
              type="text"
              placeholder="e.g. 3 - 4 Days"
              value={formData.duration || ''}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#8b1828] focus:bg-white rounded-xl py-2 px-3 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#8b1828]/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700">
              Security Deposit (Refundable)
            </label>
            <input
              type="text"
              placeholder="e.g. ₹10,000"
              value={formData.deposit || ''}
              onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#8b1828] focus:bg-white rounded-xl py-2 px-3 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#8b1828]/20 transition-all font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700">
              Inventory Status
            </label>
            <div className="relative">
              <select
                value={formData.status || 'available'}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as 'available' | 'rented' | 'reserved' | 'maintenance',
                  })
                }
                className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#8b1828] focus:bg-white rounded-xl py-2 px-3 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8b1828]/20 transition-all appearance-none cursor-pointer pr-8"
              >
                <option value="available">✨ Available for Rent</option>
                <option value="rented">⏳ Currently Rented Out</option>
                <option value="reserved">🔒 Reserved for Booking</option>
                <option value="maintenance">🧼 Dry Clean &amp; Alteration</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-stone-500">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 📝 SECTION 5: DETAILED DESCRIPTION & WHAT IS INCLUDED */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700">
              <FileText className="w-3.5 h-3.5 text-[#8b1828]" />
              <span>Outfit Details (Description)</span>
            </div>
            <span className="text-[11px] text-stone-400">Displayed on product page</span>
          </div>
          <textarea
            rows={3}
            placeholder="An iconic bridal masterpiece crafted in lush crimson velvet with high-density handcrafted zardozi embroidery..."
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#8b1828] focus:bg-white rounded-2xl py-3 px-4 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8b1828]/10 transition-all leading-relaxed placeholder-stone-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              What is Included in Package (1 Item per line)
            </label>
            <span className="text-[11px] text-stone-400">Shown as package highlights to brides</span>
          </div>
          <textarea
            rows={3}
            placeholder={`Velvet Embroidered Lehenga with 4.5m flare\nDual Dupatta Set (Head veil + Shoulder dupatta)\nCustom Fitted Blouse with matching latkans\nComplimentary Master Alteration & Sanitized Box`}
            value={(formData.includes || []).join('\n')}
            onChange={(e) =>
              setFormData({
                ...formData,
                includes: e.target.value.split('\n').filter((item) => item.trim() !== ''),
              })
            }
            className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#8b1828] focus:bg-white rounded-2xl py-2.5 px-3.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8b1828]/10 transition-all font-mono placeholder-stone-400"
          />
        </div>
      </div>
    </>
  );
}
