'use client';

import React, { useState } from 'react';
import {
  RefreshCw,
  CalendarCheck,
  Phone,
  Eye,
  X,
  User,
  Calendar,
  MapPin,
  Clock,
  FileText,
  Package,
  MessageCircle,
} from 'lucide-react';
import { BookingLead } from './types';

interface InquiriesTabProps {
  bookings: BookingLead[];
  loadingBookings: boolean;
  fetchBookings: () => void;
  handleUpdateBookingStatus: (id: string, status: string) => void;
}

export default function InquiriesTab({
  bookings,
  loadingBookings,
  fetchBookings,
  handleUpdateBookingStatus,
}: InquiriesTabProps) {
  const [selectedLead, setSelectedLead] = useState<BookingLead | null>(null);

  const cleanPhone = (phone: string) => phone.replace(/[^0-9]/g, '');

  return (
    <div className="space-y-4">
      {/* Top Header Card */}
      <div className="bg-white p-4 rounded-2xl border border-[#EDE4D8] shadow-xs flex items-center justify-between">
        <div>
          <h3 className="font-bold text-stone-900 text-sm">Customer Rental Inquiries &amp; Leads</h3>
          <p className="text-xs text-stone-500">
            Real-time leads submitted by brides &amp; grooms on website forms.
          </p>
        </div>
        <button
          onClick={fetchBookings}
          className="p-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-600 transition-colors cursor-pointer"
          title="Refresh Inquiries"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Leads Table Container */}
      <div className="bg-white rounded-2xl border border-[#EDE4D8] shadow-xs overflow-hidden">
        {loadingBookings ? (
          <div className="p-12 text-center text-stone-500">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#8b1828]" />
            <p className="text-xs">Loading inquiry records...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center text-stone-500">
            <CalendarCheck className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-stone-800">No booking inquiries yet</p>
            <p className="text-xs text-stone-400 mt-1">
              Whenever a client fills the rental inquiry form, it appears right here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-stone-600 border-b border-[#EDE4D8] uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">WhatsApp Contact</th>
                  <th className="py-3 px-4">Outfit Requested</th>
                  <th className="py-3 px-4">Event Date &amp; City</th>
                  <th className="py-3 px-4">Rental Duration</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {bookings.map((b) => (
                  <tr
                    key={b._id}
                    className="hover:bg-stone-50/80 transition-colors cursor-pointer group"
                    onClick={() => setSelectedLead(b)}
                  >
                    <td className="py-3 px-4">
                      <span className="font-semibold text-stone-900 block text-sm group-hover:text-[#8b1828] transition-colors">
                        {b.customerName}
                      </span>
                      {b.notes && (
                        <span className="text-[10px] text-stone-400 block truncate max-w-[150px]">
                          Note: {b.notes}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={`https://wa.me/${cleanPhone(b.phone)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-full font-semibold transition-colors"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{b.phone}</span>
                      </a>
                    </td>
                    <td className="py-3 px-4 text-stone-800 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-[#8b1828] shrink-0" />
                        <span className="truncate max-w-[200px]">{b.productTitle}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-stone-600">
                      <span className="block font-semibold text-stone-800">{b.eventDate || 'Flexible'}</span>
                      <span className="text-[10px] text-stone-500">{b.city || 'Punjab'}</span>
                    </td>
                    <td className="py-3 px-4 text-stone-600 font-medium">{b.rentalDuration}</td>
                    <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={b.status}
                        onChange={(e) => handleUpdateBookingStatus(b._id, e.target.value)}
                        className="bg-[#FAF8F5] border border-stone-200 rounded-lg text-[11px] py-1 px-2 font-semibold text-stone-800 focus:outline-none focus:border-[#8b1828] cursor-pointer"
                      >
                        <option value="new">🆕 New Lead</option>
                        <option value="contacted">📞 Contacted</option>
                        <option value="booked">💍 Booked</option>
                        <option value="returned">✅ Returned</option>
                        <option value="cancelled">❌ Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Full Details Button */}
                        <button
                          type="button"
                          onClick={() => setSelectedLead(b)}
                          className="inline-flex items-center gap-1 bg-stone-100 hover:bg-stone-200 text-stone-700 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer border border-stone-200"
                          title="View lead details"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#8b1828]" />
                          <span>View</span>
                        </button>

                        {/* WhatsApp Direct Chat */}
                        <a
                          href={`https://wa.me/${cleanPhone(b.phone)}?text=Hi%20${encodeURIComponent(
                            b.customerName
                          )},%20thank%20you%20for%20inquiring%20about%20${encodeURIComponent(
                            b.productTitle
                          )}%20at%20Ghar%20Shagna%20Da.`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors shadow-xs"
                          title="Follow up on WhatsApp"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>Follow up</span>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 🔍 VIEW LEAD DETAILS MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white border border-[#EDE4D8] rounded-3xl max-w-lg w-full p-6 shadow-2xl relative my-6 space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#EDE4D8] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8b1828] to-[#5c0b16] text-white flex items-center justify-center shadow-md shadow-[#8b1828]/20 shrink-0">
                  <User className="w-5 h-5 text-amber-200" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8b1828] block">
                    CUSTOMER INQUIRY DETAILS
                  </span>
                  <h3 className="text-lg font-bold text-stone-900">{selectedLead.customerName}</h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center cursor-pointer transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Details Grid */}
            <div className="space-y-3.5 text-xs">
              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-stone-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-semibold flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-[#8b1828]" />
                    <span>Outfit Requested:</span>
                  </span>
                  <span className="font-bold text-stone-900 text-sm text-right">
                    {selectedLead.productTitle}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-semibold flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Contact:</span>
                  </span>
                  <a
                    href={`https://wa.me/${cleanPhone(selectedLead.phone)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full hover:underline"
                  >
                    {selectedLead.phone}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#8b1828]" />
                    <span>Event Date</span>
                  </span>
                  <p className="font-semibold text-stone-800 text-sm">
                    {selectedLead.eventDate || 'Flexible / Not fixed'}
                  </p>
                </div>

                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8b1828]" />
                    <span>City / Location</span>
                  </span>
                  <p className="font-semibold text-stone-800 text-sm">
                    {selectedLead.city || 'Punjab / Chandigarh'}
                  </p>
                </div>

                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#8b1828]" />
                    <span>Rental Duration</span>
                  </span>
                  <p className="font-semibold text-stone-800 text-sm">
                    {selectedLead.rentalDuration || '3 - 4 Days'}
                  </p>
                </div>

                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                    Current Status
                  </span>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => {
                      const newStat = e.target.value;
                      handleUpdateBookingStatus(selectedLead._id, newStat);
                      setSelectedLead({ ...selectedLead, status: newStat as BookingLead['status'] });
                    }}
                    className="w-full bg-white border border-stone-300 rounded-lg text-xs py-1 px-2 font-semibold text-stone-800 focus:outline-none focus:border-[#8b1828]"
                  >
                    <option value="new">🆕 New Lead</option>
                    <option value="contacted">📞 Contacted</option>
                    <option value="booked">💍 Booked</option>
                    <option value="returned">✅ Returned</option>
                    <option value="cancelled">❌ Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Client Notes / Special Instructions */}
              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-stone-200 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#8b1828]" />
                  <span>Client Notes / Fitting Requirements:</span>
                </span>
                <p className="text-xs text-stone-800 leading-relaxed font-medium bg-white p-2.5 rounded-xl border border-stone-200 min-h-[50px]">
                  {selectedLead.notes || 'No extra notes provided by client.'}
                </p>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-[#EDE4D8]">
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer"
              >
                Close
              </button>

              <a
                href={`https://wa.me/${cleanPhone(selectedLead.phone)}?text=Hi%20${encodeURIComponent(
                  selectedLead.customerName
                )},%20thank%20you%20for%20inquiring%20about%20${encodeURIComponent(
                  selectedLead.productTitle
                )}%20at%20Ghar%20Shagna%20Da.%20We%20would%20love%20to%20help%20you%20with%20your%20fitting%20trial%20and%20dates.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs transition-colors shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

