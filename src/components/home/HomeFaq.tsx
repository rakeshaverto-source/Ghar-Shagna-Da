'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/data/products';

export const HOMEPAGE_FAQS = [
  {
    question: 'How many days before the wedding do I receive the outfit?',
    answer:
      'We hand over or deliver your sanitized outfit as per your requirement prior to your main ceremony. This gives you complete peace of mind to try it.',
  },
  {
    question: 'Are alterations and custom blouse fittings included in the rental?',
    answer:
      'Yes, absolutely! Every outfit rental includes complimentary alterations by our master bridal tailors. We adjust the outfit perfectly according to your body measurements.',
  },
  {
    question: 'How does the security deposit and refund process work?',
    answer: "We don't take any cash security. Only an address proof is required.",
  },
  {
    question: 'Do I need to wash or dry-clean the lehenga before returning it?',
    answer:
      'No! You do not need to wash, iron, or dry-clean anything. We take care of complete hygienic steam sterilization and professional dry-cleaning in-house after every return.',
  },
  {
    question: 'Can I book an outfit in advance for peak wedding season?',
    answer:
      'Yes, we recommend reserving your bridal lehenga or wedding dress 1 to 3 months in advance to lock your date, as premium bridal designs are booked quickly during auspicious wedding dates.',
  },
  {
    question: 'What if I am outside chandigarh or living abroad (NRI brides)?',
    answer:
      'We coordinate measurements via WhatsApp video calls and ship all across India. NRI brides can book and reserve dates online and schedule fitting trials immediately upon arriving in India.',
  },
];

export default function HomeFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="bg-[#FAF8F5] border-t border-[#F0EAE1] py-10 sm:py-14 !mt-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7 sm:space-y-8">
        {/* FAQ Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-semibold text-[#8b1828]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Rental Clarifications</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[40px] font-bold text-stone-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-0.5 bg-[#8b1828]/40 mx-auto rounded-full mt-2" />
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto font-normal">
            Everything you need to know about fittings, dates, hygiene, and deposit refunds.
          </p>
        </div>

        {/* FAQ Accordion Items */}
        <div className="space-y-3.5">
          {HOMEPAGE_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:border-amber-300/50 transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 font-sans text-sm sm:text-base font-semibold text-stone-800 hover:text-[#8b1828] transition-colors"
                >
                  <span className="leading-snug">{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#FAF0F1] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#8b1828] text-white' : 'text-[#8b1828]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-[13.5px] text-stone-600 leading-relaxed border-t border-stone-100 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Help Footer */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-sans text-sm sm:text-base font-semibold text-stone-900">
              Still have a question or specific event date?
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Our bridal stylist is online on WhatsApp to answer queries instantly.
            </p>
          </div>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              'Hello Ghar Shagna Da team, I have a query about renting bridal outfits.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-sm transition-transform hover:scale-105 shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
