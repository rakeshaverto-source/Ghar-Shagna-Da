'use client';

import React, { useState } from 'react';
import { RefreshCw, Plus, Bell } from 'lucide-react';
import { BookingLead } from './types';

interface AdminHeaderProps {
  activeTab: 'products' | 'bookings' | 'hero' | 'reviews' | 'gallery' | 'blogs' | 'analytics' | 'pageseo';
  onRefresh: () => void;
  onAddNewProduct: () => void;
  onAddNewHero: () => void;
  onAddNewBlog?: () => void;
  bookings?: BookingLead[];
  onSelectTab?: (tab: 'products' | 'bookings' | 'hero' | 'reviews' | 'gallery' | 'blogs' | 'analytics' | 'pageseo') => void;
}

export default function AdminHeader({
  activeTab,
  onRefresh,
  onAddNewProduct,
  onAddNewHero,
  onAddNewBlog,
  bookings = [],
  onSelectTab,
}: AdminHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const newBookings = bookings.filter((b) => b.status === 'new');
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
    <header className="bg-white border-b border-[#EBE3D7] h-16 px-6 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="font-bold text-stone-900 text-base">{getTabTitle()}</h1>
        <p className="text-[11px] text-stone-400">{getTabSubtitle()}</p>
      </div>

      <div className="flex items-center gap-2 relative">
        {/* 🔔 Notification Bell Icon with Live Inquiries Badge */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Customer Inquiries & Notifications"
            className="p-2 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer relative"
          >
            <Bell className="w-4 h-4" />
            {newBookings.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#8b1828] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse shadow-sm">
                {newBookings.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Drawer */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200/90 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3.5 bg-gradient-to-r from-stone-900 to-stone-800 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-300" />
                  <span className="text-xs font-bold tracking-wide">Customer Inquiries</span>
                </div>
                <span className="text-[10px] bg-rose-500/30 text-rose-200 font-semibold px-2 py-0.5 rounded-full border border-rose-400/30">
                  {newBookings.length} New
                </span>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-stone-100">
                {bookings.length === 0 ? (
                  <div className="p-6 text-center text-stone-400 text-xs">
                    No inquiries received yet
                  </div>
                ) : (
                  bookings.slice(0, 5).map((b) => (
                    <div
                      key={b._id}
                      onClick={() => {
                        setShowNotifications(false);
                        onSelectTab?.('bookings');
                      }}
                      className="p-3 hover:bg-rose-50/40 transition-colors cursor-pointer text-left"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-stone-900 truncate">
                          {b.customerName || 'Direct Customer'}
                        </span>
                        <span
                          className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                            b.status === 'new'
                              ? 'bg-rose-100 text-[#8b1828]'
                              : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8b1828] font-medium truncate">
                        {b.productTitle || 'General Wedding Rental'}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-stone-400 mt-1">
                        <span>📞 {b.phone}</span>
                        <span>{b.eventDate ? `Date: ${b.eventDate}` : ''}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-2.5 bg-stone-50 border-t border-stone-100 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowNotifications(false);
                    onSelectTab?.('bookings');
                  }}
                  className="text-xs font-bold text-[#8b1828] hover:underline cursor-pointer"
                >
                  View All Customer Leads →
                </button>
              </div>
            </div>
          )}
        </div>

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
            className="inline-flex items-center gap-1.5 bg-[#8b1828] hover:bg-[#721320] text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Outfit</span>
          </button>
        )}

        {activeTab === 'hero' && (
          <button
            type="button"
            onClick={onAddNewHero}
            className="inline-flex items-center gap-1.5 bg-[#8b1828] hover:bg-[#721320] text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Banner Slide</span>
          </button>
        )}

        {activeTab === 'blogs' && onAddNewBlog && (
          <button
            type="button"
            onClick={onAddNewBlog}
            className="inline-flex items-center gap-1.5 bg-[#8b1828] hover:bg-[#721320] text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write New Article</span>
          </button>
        )}
      </div>
    </header>
  );
}
