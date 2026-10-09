'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Power,
  Video,
  Image as ImageIcon,
  Eye,
  Play,
  Plus,
  RefreshCw,
  Edit3,
  Trash2,
} from 'lucide-react';
import { HeroSlideItem } from './types';

interface HeroMediaTabProps {
  isHeroEnabled: boolean;
  updatingHeroEnabled: boolean;
  heroMediaMode: 'video' | 'image';
  updatingMediaMode: boolean;
  heroSlides: HeroSlideItem[];
  loadingHero: boolean;
  videoSettings: {
    videoUrl: string;
    videoHeadingPrefix: string;
    videoHeadingHighlight: string;
    videoTagline: string;
    videoSubtagline: string;
    videoCtaText: string;
    videoCtaLink: string;
  };
  onOpenVideoModal: () => void;
  handleToggleHeroEnabled: (enabled: boolean) => void;
  handleToggleHeroMediaMode: (mode: 'video' | 'image') => void;
  handleToggleSlideVisibility: (slide: HeroSlideItem) => void;
  handleAddNewHero: () => void;
  handleEditHero: (slide: HeroSlideItem) => void;
  handleDeleteHeroSlide: (id: string) => void;
}

export default function HeroMediaTab({
  isHeroEnabled,
  updatingHeroEnabled,
  heroMediaMode,
  updatingMediaMode,
  heroSlides,
  loadingHero,
  videoSettings,
  onOpenVideoModal,
  handleToggleHeroEnabled,
  handleToggleHeroMediaMode,
  handleToggleSlideVisibility,
  handleAddNewHero,
  handleEditHero,
  handleDeleteHeroSlide,
}: HeroMediaTabProps) {
  return (
    <div className="space-y-4">
      {/* ⚡ MASTER ON / OFF SWITCH FOR HERO SECTION */}
      <div
        className={`border p-4 sm:p-5 rounded-2xl shadow-sm transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          isHeroEnabled
            ? 'bg-emerald-950/20 border-emerald-500/40'
            : 'bg-stone-100 border-stone-300'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
              isHeroEnabled
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'bg-stone-300 text-stone-600'
            }`}
          >
            <Power className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isHeroEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-stone-400'
                }`}
              />
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                Hero Section Master Power
              </span>
            </div>
            <h3 className="font-bold text-stone-900 text-sm sm:text-base">
              {isHeroEnabled
                ? '🟢 Hero Banner Section is TURNED ON (Visible)'
                : '⚪ Hero Banner Section is TURNED OFF (Hidden)'}
            </h3>
            <p className="text-xs text-stone-500">
              {isHeroEnabled
                ? 'The hero banner / video is live and displaying at the top of the homepage.'
                : 'The hero section is completely hidden from visitors on the homepage.'}
            </p>
          </div>
        </div>

        {/* Master ON / OFF Toggle Button */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
          <button
            type="button"
            onClick={() => handleToggleHeroEnabled(!isHeroEnabled)}
            disabled={updatingHeroEnabled}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${
              isHeroEnabled
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
                : 'bg-stone-800 hover:bg-stone-900 text-white'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{isHeroEnabled ? 'TURN OFF HERO' : 'TURN ON HERO'}</span>
          </button>
        </div>
      </div>

      {/* 🎛️ HERO MEDIA MODE TOGGLE / SWITCH CARD */}
      <div
        className={`bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 p-5 rounded-2xl shadow-md text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          !isHeroEnabled ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
              Hero Media Mode (When Section ON)
            </span>
          </div>
          <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-white">
            {heroMediaMode === 'video' ? '🎥 Cinematic Video is ACTIVE' : '🖼️ Custom Image Slides are ACTIVE'}
          </h3>
          <p className="text-xs text-stone-300 max-w-xl">
            {heroMediaMode === 'video'
              ? 'Live website displays full cinematic bridal video (/luxury_lehengas.mp4). Switch below to display custom image slides instead.'
              : 'Live website displays custom high-res banner slides for desktop & mobile. Switch below to activate cinematic bridal video.'}
          </p>
        </div>

        {/* Luxury Switch Buttons */}
        <div className="flex items-center gap-1.5 p-1.5 bg-stone-950/80 border border-stone-700 rounded-2xl shadow-inner self-stretch sm:self-auto justify-center">
          <button
            type="button"
            onClick={() => handleToggleHeroMediaMode('video')}
            disabled={updatingMediaMode}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              heroMediaMode === 'video'
                ? 'bg-gradient-to-r from-[#8b1828] to-[#ab2033] text-white shadow-lg shadow-rose-950/50 scale-[1.02]'
                : 'text-stone-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Video Mode</span>
            {heroMediaMode === 'video' && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
          </button>

          <button
            type="button"
            onClick={() => handleToggleHeroMediaMode('image')}
            disabled={updatingMediaMode}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              heroMediaMode === 'image'
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-950/50 scale-[1.02]'
                : 'text-stone-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Images Mode</span>
            {heroMediaMode === 'image' && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
          </button>
        </div>
      </div>

      {/* 🔴 LIVE ON HOMEPAGE PREVIEW CARD */}
      <div className="bg-white rounded-2xl border border-[#EDE4D8] overflow-hidden shadow-xs">
        <div className="p-4 bg-stone-50 border-b border-[#EDE4D8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                Currently Live on Homepage
              </span>
              <span className="text-[11px] text-stone-500">
                {heroMediaMode === 'video'
                  ? 'High-Definition Cinematic Bridal Video is broadcasting on live store'
                  : `Rotating ${heroSlides.length} Custom Banner Slides on live store`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                heroMediaMode === 'video'
                  ? 'bg-rose-100 text-[#8b1828] border border-rose-200'
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}
            >
              {heroMediaMode === 'video' ? <Video className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
              <span>{heroMediaMode === 'video' ? 'LIVE: Video Mode' : 'LIVE: Images Mode'}</span>
            </span>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Storefront</span>
            </Link>
          </div>
        </div>

        {/* Video Preview or Image Carousel Preview */}
        <div className="p-4">
          {heroMediaMode === 'video' ? (
            <div className="relative rounded-xl overflow-hidden border border-stone-200 bg-stone-950 aspect-[21/9] max-h-72">
              {videoSettings.videoUrl ? (
                <video
                  key={videoSettings.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={videoSettings.videoUrl} type="video/mp4" />
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-stone-900 text-stone-400 text-xs">
                  No Video Uploaded (Currently Cleared)
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between pointer-events-auto">
                  <span className="inline-flex items-center gap-1 bg-red-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <Play className="w-2.5 h-2.5 fill-current" /> Live Playing
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-stone-300 bg-black/60 px-2 py-0.5 rounded max-w-[200px] truncate">
                      {videoSettings.videoUrl || 'No Video'}
                    </span>
                    <button
                      type="button"
                      onClick={onOpenVideoModal}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-[#8b1828] hover:bg-[#a01d30] text-white shadow-md transition-all active:scale-95"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Video & Text</span>
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-white font-serif-luxury text-lg font-bold">
                    {videoSettings.videoHeadingPrefix} <span className="text-[#f7c843]">{videoSettings.videoHeadingHighlight}</span>
                  </p>
                  <p className="text-stone-300 text-xs max-w-xl line-clamp-1">
                    {videoSettings.videoSubtagline}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    {heroSlides.length} Image Banner Slides are Displaying
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    Visitors see your custom uploaded slides with auto-rotation every 6 seconds.
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-3 py-1 rounded-lg">
                Active Slides: {heroSlides.length}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-[#EDE4D8] shadow-xs flex items-center justify-between">
        <div>
          <h3 className="font-bold text-stone-900 text-sm">Hero Slide Banners Management</h3>
          <p className="text-xs text-stone-500">
            Update desktop & mobile banner photos, headings, taglines, and call-to-actions live on website.
          </p>
        </div>
        <button
          onClick={handleAddNewHero}
          className="inline-flex items-center gap-1.5 bg-[#8b1828] text-white px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-[#721320] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Slide</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loadingHero ? (
          <div className="col-span-2 p-12 text-center text-stone-500">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#8b1828]" />
            <p className="text-xs">Loading hero slides...</p>
          </div>
        ) : heroSlides.length === 0 ? (
          <div className="col-span-2 p-12 text-center text-stone-500 bg-white rounded-2xl border border-stone-200">
            <ImageIcon className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-stone-800">No Hero Slides Added</p>
          </div>
        ) : (
          heroSlides.map((slide) => (
            <div
              key={slide.slideId}
              className="bg-white border border-[#EDE4D8] rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div className="relative h-48 bg-stone-900">
                <Image src={slide.desktopImage} alt={slide.headingPrefix} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                    {slide.subtitle}
                  </span>
                  <h4 className="font-serif-luxury text-xl font-bold">
                    {slide.headingPrefix} <span className="text-[#e2a874]">{slide.headingHighlight}</span>
                  </h4>
                  <p className="text-xs text-stone-300 line-clamp-1">{slide.subtagline}</p>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Desktop Image:</span>
                  <span className="font-mono text-[10px] truncate max-w-[180px] text-stone-400">
                    {slide.desktopImage}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Mobile Image:</span>
                  <span className="font-mono text-[10px] truncate max-w-[180px] text-stone-400">
                    {slide.mobileImage}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Button CTA:</span>
                  <span className="font-semibold text-stone-800">
                    {slide.ctaText} → {slide.ctaLink}
                  </span>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleToggleSlideVisibility(slide)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      slide.isVisible !== false
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                        : 'bg-stone-100 text-stone-500 hover:bg-stone-200 border border-stone-300 line-through'
                    }`}
                    title="Toggle slide on/off"
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        slide.isVisible !== false ? 'bg-emerald-500' : 'bg-stone-400'
                      }`}
                    />
                    <span>{slide.isVisible !== false ? 'ON (Active)' : 'OFF (Hidden)'}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditHero(slide)}
                      className="p-1.5 text-stone-600 hover:text-[#8b1828] hover:bg-rose-50 rounded-lg transition-colors"
                      title="Edit Slide"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteHeroSlide(slide._id || slide.slideId)}
                      className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Slide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
