'use client';

import React from 'react';
import { OutfitItem, BookingLead } from './types';
import {
  X,
  MessageCircle,
  Phone,
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  CalendarCheck,
  AlertCircle,
} from 'lucide-react';

interface OutfitInquiriesModalProps {
  product: OutfitItem | null;
  inquiries: BookingLead[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateBookingStatus: (id: string, status: string) => void;
}

export default function OutfitInquiriesModal({
  product,
  inquiries,
  isOpen,
  onClose,
  onUpdateBookingStatus,
}: OutfitInquiriesModalProps) {
  if (!isOpen || !product) return null;

  const cleanPhone = (p: string) => p.replace(/[^0-9]/g, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border border-[#EDE4D8] rounded-3xl max-w-3xl w-full shadow-2xl relative my-6 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#FAF8F5] via-white to-[#FAF8F5] border-b border-[#EDE4D8] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {product.images && product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-12 h-14 object-cover rounded-xl border border-stone-200 shrink-0 shadow-xs"
              />
            ) : (
              <div className="w-12 h-14 rounded-xl bg-stone-100 flex items-center justify-center text-xs shrink-0">
                👗
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8b1828] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60">
                  Customer Inquiries
                </span>
                <span className="text-xs font-bold text-stone-500">
                  {inquiries.length} {inquiries.length === 1 ? 'Booking Lead' : 'Booking Leads'}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-serif font-bold text-stone-900 line-clamp-1 mt-0.5">
                {product.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Inquiries List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3.5">
          {inquiries.length > 0 ? (
            inquiries.map((lead) => {
              const phoneClean = cleanPhone(lead.phone);
              const waText = encodeURIComponent(
                `Hello ${lead.customerName}! Thank you for your inquiry about "${product.title}" for your wedding date on ${lead.eventDate || 'your upcoming date'}. Is this still available for you?`
              );
              const waUrl = `https://wa.me/91${phoneClean}?text=${waText}`;

              return (
                <div
                  key={lead._id}
                  className="bg-[#FAF8F5] border border-stone-200 hover:border-stone-300 rounded-2xl p-4 sm:p-5 transition-all space-y-3"
                >
                  {/* Row 1: Customer Name, Status dropdown & WhatsApp CTA */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2.5 border-b border-stone-200/60">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#8b1828]/10 text-[#8b1828] font-bold text-xs flex items-center justify-center shrink-0">
                        {lead.customerName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-stone-900">
                          {lead.customerName}
                        </h4>
                        <p className="text-[11px] text-stone-500 font-mono">
                          Phone: {lead.phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                      {/* Status Dropdown */}
                      <select
                        value={lead.status || 'new'}
                        onChange={(e) => onUpdateBookingStatus(lead._id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-xl border cursor-pointer focus:outline-none transition-colors ${
                          lead.status === 'new'
                            ? 'bg-rose-50 border-rose-200 text-[#8b1828]'
                            : lead.status === 'contacted'
                            ? 'bg-amber-50 border-amber-200 text-amber-800'
                            : lead.status === 'booked'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold'
                            : lead.status === 'returned'
                            ? 'bg-blue-50 border-blue-200 text-blue-800'
                            : 'bg-stone-100 border-stone-200 text-stone-600'
                        }`}
                      >
                        <option value="new">🔴 New Lead</option>
                        <option value="contacted">🟡 Contacted / Chatting</option>
                        <option value="booked">🟢 Booked &amp; Confirmed</option>
                        <option value="returned">🔵 Returned &amp; Completed</option>
                        <option value="cancelled">⚪ Cancelled</option>
                      </select>

                      {/* Instant WhatsApp Action */}
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  {/* Row 2: Details grid (Event Date, Duration, City) */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="flex items-center gap-2 text-stone-700 bg-white p-2.5 rounded-xl border border-stone-100">
                      <Calendar className="w-3.5 h-3.5 text-[#8b1828] shrink-0" />
                      <div>
                        <span className="text-[10px] text-stone-400 block uppercase font-medium">Event Date</span>
                        <span className="font-semibold text-stone-900">{lead.eventDate || 'Not specified'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-stone-700 bg-white p-2.5 rounded-xl border border-stone-100">
                      <Clock className="w-3.5 h-3.5 text-[#8b1828] shrink-0" />
                      <div>
                        <span className="text-[10px] text-stone-400 block uppercase font-medium">Rental Period</span>
                        <span className="font-semibold text-stone-900">{lead.rentalDuration || '3 - 4 Days'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-stone-700 bg-white p-2.5 rounded-xl border border-stone-100 col-span-2 sm:col-span-1">
                      <MapPin className="w-3.5 h-3.5 text-[#8b1828] shrink-0" />
                      <div>
                        <span className="text-[10px] text-stone-400 block uppercase font-medium">Location</span>
                        <span className="font-semibold text-stone-900">{lead.city || 'Punjab'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Notes */}
                  {lead.notes && (
                    <div className="bg-white p-3 rounded-xl border border-stone-100 text-xs text-stone-700">
                      <span className="text-[10px] text-stone-400 uppercase font-bold block mb-0.5">
                        Client Notes / Measurements:
                      </span>
                      <p className="leading-relaxed italic">&ldquo;{lead.notes}&rdquo;</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 border border-dashed border-stone-200 rounded-2xl bg-stone-50/50 space-y-2">
              <CalendarCheck className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-sm font-semibold text-stone-700">
                No rental inquiries received for this outfit yet.
              </p>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                Whenever brides submit inquiry or trial booking forms for &ldquo;{product.title}&rdquo;, they will appear here instantly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
