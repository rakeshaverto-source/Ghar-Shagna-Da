'use client';

import React from 'react';
import { MessageCircle, Calendar } from 'lucide-react';
import { SITE_CONFIG } from '@/data/products';

interface HomeCtaBannerProps {
  onOpenModal: () => void;
}

export default function HomeCtaBanner({ onOpenModal }: HomeCtaBannerProps) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-[#8b1828] to-[#a31f31] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl text-white">
        <p className="font-script text-3xl text-amber-200">
          Let us customize your dreamy wedding outfit.
        </p>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold">
          Reserve Your Outfit Before Wedding Season Fills Up
        </h2>
        <p className="text-sm text-rose-100 max-w-xl mx-auto">
          Directly connect with our styling consultant to inspect sizes, check specific dates, or schedule an in-person trial appointment.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              'Hello Ghar Shagna Da! I would like to book an appointment to try bridal lehengas and sherwanis.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 px-8 rounded-full text-sm shadow-md transition-transform hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Connect on WhatsApp</span>
          </a>

          <button
            onClick={onOpenModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-stone-900 hover:bg-stone-100 font-bold py-3 px-8 rounded-full text-sm transition-all"
          >
            <Calendar className="w-4 h-4 text-[#8b1828]" />
            <span>Fill Quick Inquiry Form</span>
          </button>
        </div>
      </div>
    </section>
  );
}
