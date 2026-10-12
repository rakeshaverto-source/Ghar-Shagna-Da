'use client';

import React, { useState, useEffect } from 'react';
import { CalendarCheck, ShieldCheck, CheckCircle2, Phone, Send } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: 'Bridal Lehenga',
    date: '',
    message: '',
  });
  const [minDate, setMinDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Set minDate in useEffect to avoid Next.js prerender error
  useEffect(() => {
    setMinDate(new Date().toISOString().split('T')[0]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please provide your name and phone number.');
      return;
    }

    setIsSubmitting(true);

    // Save lead directly to MongoDB database -> Admin Panel
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productTitle: formData.category,
          customerName: formData.name.trim(),
          phone: formData.phone.trim(),
          eventDate: formData.date || 'Not specified',
          rentalDuration: '3 Days',
          city: 'Website Inquiry',
          notes: formData.message.trim() || 'Direct inquiry from Contact page',
        }),
      });
    } catch (err) {
      console.log('Error saving lead to database:', err);
    }

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white border border-[#EDE4D8] rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between h-full">
      <div className="border-b border-[#F0EAE1] pb-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8b1828] bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200/60">
            Quick Trial & Lead Form
          </span>
        </div>
        <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2 mt-1">
          <CalendarCheck className="w-5 h-5 text-[#8b1828]" />
          <span>Send Quick Inquiry</span>
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Share your details. Your inquiry will be directly submitted to our bridal studio team.
        </p>
      </div>

      {isSubmitted ? (
        <div className="py-12 text-center space-y-4 my-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-serif-luxury text-2xl font-bold text-stone-900">
              Inquiry Sent to Studio!
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1.5 max-w-sm mx-auto leading-relaxed">
              Dhanvaad! Our bridal styling team has received your inquiry. We will contact you shortly on your phone number for trial fitting slots.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '',
                phone: '',
                category: 'Bridal Lehenga',
                date: '',
                message: '',
              });
            }}
            className="text-xs text-[#8b1828] font-bold hover:underline cursor-pointer pt-2 block mx-auto"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Jaspreet Kaur"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#FAF8F5] focus:bg-white focus:border-[#8b1828] focus:ring-2 focus:ring-[#8b1828]/10 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                Phone Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#FAF8F5] focus:bg-white focus:border-[#8b1828] focus:ring-2 focus:ring-[#8b1828]/10 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none transition-all"
                />
                <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                Looking for
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#FAF8F5] focus:bg-white focus:border-[#8b1828] focus:ring-2 focus:ring-[#8b1828]/10 text-xs sm:text-sm text-stone-900 focus:outline-none transition-all cursor-pointer"
              >
                <option value="Bridal Lehenga">Bridal Lehenga</option>
                <option value="Wedding Dress / Gown">Wedding Dress / Gown</option>
                <option value="Groom Sherwani">Groom Sherwani</option>
                <option value="Both Bridal & Groom Combo">Both Bridal & Groom Combo</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                Wedding / Function Date
              </label>
              <input
                type="date"
                min={minDate}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#FAF8F5] focus:bg-white focus:border-[#8b1828] focus:ring-2 focus:ring-[#8b1828]/10 text-xs sm:text-sm text-stone-900 focus:outline-none transition-all cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
              Message / Outfit Preference (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Tell us any specific color, designer work, budget range, or measurement preference..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-3.5 rounded-xl border border-stone-200 bg-[#FAF8F5] focus:bg-white focus:border-[#8b1828] focus:ring-2 focus:ring-[#8b1828]/10 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#8b1828] hover:bg-[#721320] disabled:bg-stone-300 text-white font-bold py-3.5 px-6 rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Submitting Inquiry...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </>
            )}
          </button>

          <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-stone-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Free Trial Fitting
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Direct Admin Notification
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
