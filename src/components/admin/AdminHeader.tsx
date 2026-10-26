'use client';

import React from 'react';
import { RefreshCw, Plus, Menu } from 'lucide-react';
import AdminNotificationBell from './AdminNotificationBell';

interface AdminHeaderProps {
  activeTab: 'products' | 'bookings' | 'hero' | 'reviews' | 'gallery' | 'blogs' | 'analytics' | 'pageseo';
  onRefresh: () => void;
  onAddNewProduct: () => void;
  onAddNewHero: () => void;
  onAddNewBlog?: () => void;
  onSelectTab?: (tab: 'products' | 'bookings' | 'hero' | 'reviews' | 'gallery' | 'blogs' | 'analytics' | 'pageseo') => void;
  onOpenMenu?: () => void;
}

export default function AdminHeader({
  activeTab,
  onRefresh,
  onAddNewProduct,
  onAddNewHero,
  onAddNewBlog,
  onSelectTab,
  onOpenMenu,
}: AdminHeaderProps) {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'products':
        return 'Outfits Inventory Catalog';
      case 'bookings':
        return 'Customer Rental Inquiries & Leads';
      case 'hero':
        return 'Hero Banner & Homepage Media Slides';
      case 'reviews':
        return 'Home Page Reviews & Client Testimonials';
      case 'gallery':
        return 'Photo Gallery & Real Bride Showcase';
      case 'blogs':
        return 'Wedding Stories & Bridal Articles';
      case 'pageseo':
        return 'Per-Page SEO (Meta Titles & Descriptions)';
      case 'analytics':
      default:
        return 'SEO, Google Analytics & Meta Pixel Tracking';
    }
  };

  const getTabSubtitle = () => {
    switch (activeTab) {
      case 'products':
        return 'Manage bridal lehengas, sherwanis, gowns, pricing and availability';
      case 'bookings':
        return 'Follow up with brides & grooms on WhatsApp for appointments';
      case 'hero':
        return 'Upload & update high-resolution banner images for PC & Mobile';
      case 'reviews':
        return 'Post, edit, feature or remove verified bride reviews shown on the Home Page';
      case 'gallery':
        return 'Upload client photoshoot pictures, categorize bridal moments, and tag outfits';
      case 'blogs':
        return 'Write and publish wedding rental guides, styling advice, and bridal couture trends';
      case 'pageseo':
        return 'Customize Google search preview, meta descriptions, and keywords for individual pages';
      case 'analytics':
      default:
        return 'Manage Google Search Console token, GA4 Measurement ID, and Meta Pixel';
    }
  };

  return (
    <header className="bg-white border-b border-[#EBE3D7] h-14 md:h-16 px-3 sm:px-6 flex items-center justify-between gap-2 sticky top-0 z-30">
      <div className="flex items-center gap-2 min-w-0">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="md:hidden p-2 -ml-1 rounded-xl text-stone-700 hover:bg-stone-100 shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="min-w-0">
          <h1 className="font-bold text-stone-900 text-sm md:text-base truncate">{getTabTitle()}</h1>
          <p className="hidden md:block text-[11px] text-stone-400 truncate">{getTabSubtitle()}</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 relative shrink-0">
        <AdminNotificationBell onOpenLeads={() => onSelectTab?.('bookings')} />

        <button
          type="button"
          onClick={onRefresh}
          title="Refresh Data"
          className="p-2 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {activeTab === 'products' && (
          <button
            type="button"
            onClick={onAddNewProduct}
            className="inline-flex items-center gap-1.5 bg-[#8b1828] hover:bg-[#721320] text-white p-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">New Outfit</span>
          </button>
        )}

        {activeTab === 'hero' && (
          <button
            type="button"
            onClick={onAddNewHero}
            className="inline-flex items-center gap-1.5 bg-[#8b1828] hover:bg-[#721320] text-white p-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Add Banner Slide</span>
          </button>
        )}

        {activeTab === 'blogs' && onAddNewBlog && (
          <button
            type="button"
            onClick={onAddNewBlog}
            className="inline-flex items-center gap-1.5 bg-[#8b1828] hover:bg-[#721320] text-white p-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Write New Article</span>
          </button>
        )}
      </div>
    </header>
  );
}
