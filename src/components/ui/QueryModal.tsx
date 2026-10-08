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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-[#f0eae1] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-stone-900">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 text-2xl font-light"
          aria-label="Close"
        >
          &times;
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <span className="font-script text-2xl text-[#8b1828] block">
                Reserve Your Date
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-stone-900 mt-0.5">
                {productTitle ? productTitle : 'Book a Fitting Trial / Query'}
              </h3>
              {productPrice && (
                <p className="text-xs text-stone-500 mt-1">
                  Rental starting at <span className="font-bold text-[#8b1828]">{productPrice}</span>
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Simran Kaur / Gurpreet Singh"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#faf8f5] border border-stone-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#8b1828] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#faf8f5] border border-stone-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#8b1828] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Wedding Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full bg-[#faf8f5] border border-stone-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-stone-900 focus:outline-none focus:border-[#8b1828] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Rental Duration
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <select
                      value={formData.rentalDays}
                      onChange={(e) => setFormData({ ...formData, rentalDays: e.target.value })}
                      className="w-full bg-[#faf8f5] border border-stone-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-stone-900 focus:outline-none focus:border-[#8b1828] focus:bg-white"
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
                      placeholder="e.g. Ludhiana, Amritsar"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#faf8f5] border border-stone-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#8b1828] focus:bg-white"
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
                  className="w-full bg-[#faf8f5] border border-stone-200 rounded-xl py-2 px-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#8b1828] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#8b1828] hover:bg-[#6e1320] text-white font-semibold py-3 px-6 rounded-xl text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Submitting...' : 'Send Inquiry & Open WhatsApp'}</span>
              </button>

              <p className="text-center text-[11px] text-stone-400">
                🔒 Your inquiry is saved in our system and directly transferred to WhatsApp.
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            <h3 className="font-serif-luxury text-2xl font-bold text-stone-900">Inquiry Received!</h3>
            <p className="text-sm text-stone-600">
              Your query has been recorded. WhatsApp will connect you directly with our bridal stylist for date confirmation and fitting trials.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="border border-stone-300 text-stone-700 px-6 py-2 rounded-xl text-sm hover:bg-stone-50"
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
