'use client';

import React from 'react';
import Link from 'next/link';
import {
  Package,
  CalendarCheck,
  Image as ImageIcon,
  ExternalLink,
  Plus,
  Database,
  LogOut,
  LineChart,
  Globe,
  Star,
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: 'products' | 'bookings' | 'hero' | 'reviews' | 'gallery' | 'analytics' | 'pageseo';
  setActiveTab: (tab: 'products' | 'bookings' | 'hero' | 'reviews' | 'gallery' | 'analytics' | 'pageseo') => void;
  productsCount: number;
  bookingsCount: number;
  heroSlidesCount: number;
  reviewsCount?: number;
  galleryCount?: number;
  handleAddNewProduct: () => void;
  handleLogout: () => void;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  productsCount,
  bookingsCount,
  heroSlidesCount,
  reviewsCount = 0,
  galleryCount = 0,
  handleAddNewProduct,
  handleLogout,
}: AdminSidebarProps) {
  return (
    <aside className="w-full md:w-64 bg-white border-r border-[#EBE3D7] flex flex-col shrink-0 md:min-h-screen sticky top-0 z-40 shadow-xs">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#EBE3D7] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8b1828] to-[#600f1a] text-white flex items-center justify-center font-bold text-sm shadow-md">
            GS
          </div>
          <div>
            <span className="font-bold text-stone-900 text-sm block leading-tight">Ghar Shagna Da</span>
            <span className="text-[10px] uppercase tracking-widest text-[#8b1828] font-bold">Admin Portal</span>
          </div>
        </div>
      </div>

      {/* Sidebar Nav Links */}
      <div className="p-4 space-y-1.5 flex-1">
        <p className="text-[10px] uppercase tracking-wider font-semibold text-stone-400 px-3 mb-2">Management</p>

        <button
          onClick={() => setActiveTab('products')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'products'
              ? 'bg-[#8b1828] text-white shadow-md shadow-[#8b1828]/20'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Package className="w-4 h-4" />
            <span>Outfits Catalog</span>
          </div>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              activeTab === 'products' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
            }`}
          >
            {productsCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'bookings'
              ? 'bg-[#8b1828] text-white shadow-md shadow-[#8b1828]/20'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <CalendarCheck className="w-4 h-4" />
            <span>Rental Inquiries</span>
          </div>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              activeTab === 'bookings' ? 'bg-white/20 text-white' : 'bg-rose-100 text-[#8b1828]'
            }`}
          >
            {bookingsCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('hero')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'hero'
              ? 'bg-[#8b1828] text-white shadow-md shadow-[#8b1828]/20'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <ImageIcon className="w-4 h-4" />
            <span>Hero Banners & Media</span>
          </div>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              activeTab === 'hero' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
            }`}
          >
            {heroSlidesCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'reviews'
              ? 'bg-[#8b1828] text-white shadow-md shadow-[#8b1828]/20'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Star className="w-4 h-4" />
            <span>Home Reviews</span>
          </div>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              activeTab === 'reviews' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900'
            }`}
          >
            {reviewsCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('gallery')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'gallery'
              ? 'bg-[#8b1828] text-white shadow-md shadow-[#8b1828]/20'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <ImageIcon className="w-4 h-4 text-emerald-600" />
            <span>Photo Gallery</span>
          </div>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              activeTab === 'gallery' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            {galleryCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('pageseo')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'pageseo'
              ? 'bg-[#8b1828] text-white shadow-md shadow-[#8b1828]/20'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4" />
            <span>Per-Page SEO</span>
          </div>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              activeTab === 'pageseo' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            Meta
          </span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'analytics'
              ? 'bg-[#8b1828] text-white shadow-md shadow-[#8b1828]/20'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <LineChart className="w-4 h-4" />
            <span>SEO & Pixel Tracking</span>
          </div>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              activeTab === 'analytics' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
            }`}
          >
            Live
          </span>
        </button>

        <div className="pt-4 mt-4 border-t border-stone-100">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-stone-400 px-3 mb-2">Quick Shortcuts</p>

          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            <span>Open Live Store</span>
          </Link>

          <button
            onClick={handleAddNewProduct}
            className="w-full mt-2 flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#8b1828] bg-rose-50 hover:bg-rose-100/70 border border-rose-200/60 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Outfit</span>
          </button>
        </div>
      </div>

      {/* Sidebar Footer with Logout */}
      <div className="p-4 border-t border-[#EBE3D7] bg-[#FAF8F5]/60 space-y-3">
        <div className="flex items-center gap-2 text-[11px] text-stone-500">
          <Database className="w-3.5 h-3.5 text-emerald-600" />
          <span>MongoDB & Cloudinary</span>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-100 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout Session</span>
        </button>
      </div>
    </aside>
  );
}
