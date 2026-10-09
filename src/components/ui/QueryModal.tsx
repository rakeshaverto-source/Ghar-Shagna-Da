'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Calendar, Phone, User, Clock, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '@/data/products';

interface QueryModalProps {
  productTitle?: string;
  productPrice?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function QueryModal({
  productTitle,
  productPrice,
  isOpen,
  onClose,
}: QueryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventDate: '',
    rentalDays: '3 Days',
    city: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Save lead to MongoDB in background
    try {
      fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productTitle: productTitle || 'General Wedding Outfit',
          customerName: formData.name,
          phone: formData.phone,
          eventDate: formData.eventDate,
          rentalDuration: formData.rentalDays,
          city: formData.city,
          notes: formData.notes,
        }),
      }).catch((err) => console.log('Offline save notice:', err));
    } catch {
      // ignore offline fallback
    }

    const message = `🌸 *Ghar Shagna Da - Rental Inquiry* 🌸
*Outfit:* ${productTitle || 'General Wedding Outfit'}
*Customer Name:* ${formData.name}
*Phone:* ${formData.phone}
*Wedding / Event Date:* ${formData.eventDate || 'Not specified'}
*Rental Duration:* ${formData.rentalDays}
*City:* ${formData.city || 'Punjab'}
*Alteration & Note:* ${formData.notes || 'None'}`;

    setTimeout(() => {
      window.open(
        `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`,
        '_blank'
      );
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div className="bg-gradient-to-b from-[#FFFDF9] via-white to-[#FAF6F0] border border-[#E7D6C4] rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-[0_25px_60px_-15px_rgba(139,24,40,0.25)] relative text-stone-900 overflow-hidden">
        
        {/* Subtle Luxury Corner Ribbon/Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-200 via-[#8b1828] to-amber-200" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center text-xl transition-colors"
          aria-label="Close"
        >
          &times;
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="mb-5 text-center sm:text-left pr-6">
              <span className="inline-block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8b1828] bg-rose-50 border border-rose-200/60 px-3 py-0.5 rounded-full mb-1.5">
                Reserve Your Date
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight leading-snug">
                {productTitle ? productTitle : 'Book a Fitting Trial / Query'}
              </h3>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name <span className="text-[#8b1828]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Simran Kaur / Gurpreet Singh"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-stone-50/80 border border-stone-200/90 rounded-xl py-2.5 pl-10 pr-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#8b1828] focus:bg-white focus:ring-2 focus:ring-[#8b1828]/10 transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    WhatsApp Number <span className="text-[#8b1828]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-stone-50/80 border border-stone-200/90 rounded-xl py-2.5 pl-10 pr-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#8b1828] focus:bg-white focus:ring-2 focus:ring-[#8b1828]/10 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Wedding Date <span className="text-[#8b1828]">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full bg-stone-50/80 border border-stone-200/90 rounded-xl py-2.5 pl-10 pr-3 text-sm text-stone-900 focus:outline-none focus:border-[#8b1828] focus:bg-white focus:ring-2 focus:ring-[#8b1828]/10 transition-all shadow-inner"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Rental Duration
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <select
                      value={formData.rentalDays}
                      onChange={(e) => setFormData({ ...formData, rentalDays: e.target.value })}
                      className="w-full bg-stone-50/80 border border-stone-200/90 rounded-xl py-2.5 pl-10 pr-3 text-sm text-stone-900 focus:outline-none focus:border-[#8b1828] focus:bg-white focus:ring-2 focus:ring-[#8b1828]/10 transition-all shadow-inner appearance-none cursor-pointer"
                    >
                      <option value="3 Days">3 Days (Standard Wedding)</option>
                      <option value="4 Days">4 Days (Extended Function)</option>
                      <option value="7 Days">7 Days (Destination Wedding)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    City / Town
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Ludhiana, Mohali"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-stone-50/80 border border-stone-200/90 rounded-xl py-2.5 pl-10 pr-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#8b1828] focus:bg-white focus:ring-2 focus:ring-[#8b1828]/10 transition-all shadow-inner"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Alteration Details or Specific Requests
                </label>
                <textarea
                  rows={2}
                  placeholder="Need blouse fitting, matching turban coordinate, etc."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-stone-50/80 border border-stone-200/90 rounded-xl py-2 px-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#8b1828] focus:bg-white focus:ring-2 focus:ring-[#8b1828]/10 transition-all shadow-inner"
                />
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#8b1828] via-[#a31d32] to-[#8b1828] hover:from-[#721320] hover:to-[#721320] text-white font-semibold py-3 px-6 rounded-xl text-sm transition-all shadow-[0_8px_20px_rgba(139,24,40,0.3)] hover:shadow-[0_12px_25px_rgba(139,24,40,0.4)] active:scale-[0.99] disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Submitting...' : 'Send Inquiry & Open WhatsApp'}</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-stone-500 pt-1">
                <span>🔒</span>
                <span>Direct WhatsApp booking with Ghar Shagna Da Master Stylist</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900">Inquiry Received!</h3>
            <p className="text-sm text-stone-600 max-w-sm mx-auto">
              Your inquiry has been recorded. WhatsApp will connect you directly with our bridal stylist for date confirmation and custom fitting measurements.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="border border-stone-300 text-stone-700 px-6 py-2 rounded-xl text-sm hover:bg-stone-50 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
