'use client';

import React from 'react';
import { ExternalLink, Trash2 } from 'lucide-react';
import { PageSeoItem } from '../types';

interface PageSeoFormProps {
  selectedLabel: string;
  selectedPagePath: string;
  currentPageSeo: PageSeoItem;
  currentTitle: string;
  currentDesc: string;
  displayCanonical: string;
  cleanDisplayUrl: string;
  titleLen: number;
  descLen: number;
  onUpdateField: (field: keyof PageSeoItem, value: any) => void;
  onRemovePageSeo: () => void;
}

export default function PageSeoForm({
  selectedLabel,
  selectedPagePath,
  currentPageSeo,
  currentTitle,
  currentDesc,
  displayCanonical,
  cleanDisplayUrl,
  titleLen,
  descLen,
  onUpdateField,
  onRemovePageSeo,
}: PageSeoFormProps) {
  return (
    <div className="bg-white border border-[#EDE4D8] rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
      {/* Header Row: Badge, Title & Crawler status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#EBE3D7] pb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#8b1828] to-[#600f1a] text-white flex items-center justify-center font-extrabold text-xs shadow-md shadow-[#8b1828]/20 shrink-0">
            SEO
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-stone-900 text-base">
                {selectedLabel.split(' (')[0]}
              </h3>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-stone-100 text-[#8b1828] font-bold border border-stone-200">
                {selectedPagePath}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Configure search crawler visibility, ranking title tags and snippets
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-stretch sm:self-auto justify-end">
          {/* Google Index Toggle */}
          <div className="relative">
            <select
              value={currentPageSeo.noIndex ? 'noindex' : 'index'}
              onChange={(e) => onUpdateField('noIndex', e.target.value === 'noindex')}
              className="bg-[#FAF8F5] border border-emerald-300 text-emerald-800 rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer appearance-none pr-8"
            >
              <option value="index">Google: Index &amp; Follow (Default Public)</option>
              <option value="noindex">Google: NoIndex &amp; NoFollow (Hidden from Search)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-emerald-700">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>

          {/* Visit Page Link */}
          <a
            href={selectedPagePath}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-xs font-semibold text-stone-700 border border-stone-200 transition-colors"
          >
            <span>Visit Page</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {currentPageSeo.title && (
            <button
              type="button"
              onClick={onRemovePageSeo}
              title="Reset to default"
              className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 🔍 GOOGLE SEARCH SNIPPET PREVIEW (DESKTOP & MOBILE) */}
      <div className="bg-[#FAF8F5] border border-[#EBE3D7] rounded-2xl p-5 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
          GOOGLE SEARCH SNIPPET PREVIEW (DESKTOP &amp; MOBILE)
        </span>

        <div className="pt-1 space-y-1">
          {/* URL line with favicon */}
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <div className="w-4 h-4 rounded-full bg-[#8b1828] text-[10px] font-bold text-white flex items-center justify-center shrink-0">
              GS
            </div>
            <span className="text-stone-700 font-mono text-[11px] truncate">
              {cleanDisplayUrl || 'gharshagnada.in'}
            </span>
            <span className="text-stone-400">›</span>
            <span className="text-stone-500 text-[11px] lowercase truncate">
              {selectedPagePath === '/'
                ? 'home'
                : selectedPagePath.replace('/product/', 'outfit/').replace('/', '')}
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-semibold text-[#1a0dab] hover:underline cursor-pointer leading-tight line-clamp-1">
            {currentTitle}
          </h4>

          <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
            {currentDesc}
          </p>
        </div>
      </div>

      {/* ✍️ INPUT: META TITLE */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
            META TITLE (SEO HEADLINE) *
          </label>
          <span
            className={`text-[11px] font-mono ${
              titleLen > 60 ? 'text-amber-700 font-bold' : 'text-stone-500'
            }`}
          >
            {titleLen}/60 chars (Recommended: 50-60)
          </span>
        </div>
        <input
          type="text"
          value={currentPageSeo.title || ''}
          onChange={(e) => onUpdateField('title', e.target.value)}
          placeholder={currentTitle}
          className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#8b1828] rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8b1828]/10 transition-all font-semibold placeholder-stone-400"
        />
      </div>

      {/* ✍️ TWO-COL ROW: TARGET KEYWORDS & CANONICAL URL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
            TARGET KEYWORDS (COMMA SEPARATED)
          </label>
          <input
            type="text"
            value={currentPageSeo.keywords || ''}
            onChange={(e) => onUpdateField('keywords', e.target.value)}
            placeholder="Bridal Lehenga Rent, Groom Sherwani Hire, Chandigarh"
            className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#8b1828] rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8b1828]/10 transition-all placeholder-stone-400"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
            CANONICAL URL (PREVENT DUPLICATE CONTENT)
          </label>
          <input
            type="text"
            value={currentPageSeo.canonical || ''}
            onChange={(e) => onUpdateField('canonical', e.target.value)}
            placeholder={displayCanonical}
            className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#8b1828] rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8b1828]/10 transition-all placeholder-stone-400 font-mono"
          />
        </div>
      </div>

      {/* ✍️ INPUT: SOCIAL MEDIA BANNER (OG:IMAGE) */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
          SOCIAL MEDIA BANNER URL (OG:IMAGE FOR WHATSAPP &amp; INSTAGRAM)
        </label>
        <input
          type="text"
          value={currentPageSeo.ogImage || ''}
          onChange={(e) => onUpdateField('ogImage', e.target.value)}
          placeholder="https://gharshagnada.in/hero-bride.jpg"
          className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#8b1828] rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8b1828]/10 transition-all placeholder-stone-400 font-mono"
        />
      </div>

      {/* ✍️ INPUT: META DESCRIPTION */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
            META DESCRIPTION (GOOGLE SNIPPET) *
          </label>
          <span
            className={`text-[11px] font-mono ${
              descLen > 160 ? 'text-amber-700 font-bold' : 'text-stone-500'
            }`}
          >
            {descLen}/160 chars (Recommended: 140-160)
          </span>
        </div>
        <textarea
          rows={3}
          value={currentPageSeo.description || ''}
          onChange={(e) => onUpdateField('description', e.target.value)}
          placeholder={currentDesc}
          className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#8b1828] rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8b1828]/10 transition-all leading-relaxed placeholder-stone-400"
        />
      </div>
    </div>
  );
}
