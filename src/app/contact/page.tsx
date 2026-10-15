import { Metadata } from 'next';
import { Phone, Mail, MapPin, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/data/products';
import { constructMetadata } from '@/lib/seo';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = constructMetadata({
  title: 'Contact Us & Book Fitting Trial | Ghar Shagna Da',
  description: 'Connect with Ghar Shagna Da for bridal lehenga queries, groom sherwani trials, and wedding rental reservations. WhatsApp or call our bridal styling experts.',
  canonical: `${SITE_CONFIG.domain}/contact`,
  keywords: [
    'contact Ghar Shagna Da',
    'bridal lehenga trial appointment',
    'sherwani rental phone number',
    'wedding dresses punjab address',
  ],
});

export default function ContactPage() {
  return (
    <div className="bg-[#FAF8F5]/60 min-h-screen pt-28 sm:pt-36 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Luxury Header */}
        <div className="text-center space-y-3.5 max-w-2xl mx-auto">
          <div className="inline-flex items-center bg-rose-50 border border-rose-200/80 px-4 py-1.5 rounded-full shadow-2xs">
            <span className="font-script text-lg text-[#8b1828] font-bold">Personalized Fitting Trials</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            Visit Our Studio or Send a Direct Inquiry
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            We warmly invite you for exclusive fitting trials and custom alterations. Schedule your boutique visit or connect with our bridal stylists online.
          </p>
        </div>

        {/* Main 2-Column Luxury Cards with Equal Size & Equal Height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Column: Boutique & Studio Details */}
          <div className="bg-white border border-[#EDE4D8] rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8b1828] bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200/60">
                    Studio & Store
                  </span>
                  <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                    Boutique Details
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-[#8b1828]/5 border border-[#8b1828]/15 flex items-center justify-center text-[#8b1828]">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Location */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-[#FAF8F5] transition-colors">
                  <div className="p-2.5 bg-rose-50 rounded-xl text-[#8b1828] shrink-0 border border-rose-100">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900">Store Address</p>
                    <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{SITE_CONFIG.address}</p>
                    <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 font-semibold mt-1">
                      <CheckCircle2 className="w-3 h-3 text-amber-600" /> Walk-in & Trials Welcome
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-[#FAF8F5] transition-colors">
                  <div className="p-2.5 bg-rose-50 rounded-xl text-[#8b1828] shrink-0 border border-rose-100">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900">Direct Phone Support</p>
                    <a
                      href={`tel:${SITE_CONFIG.phone}`}
                      className="text-xs sm:text-sm font-semibold text-[#8b1828] hover:underline mt-0.5 block"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                    <p className="text-[11px] text-stone-400 mt-0.5">Monday to Sunday, 10:00 AM - 8:30 PM</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-[#FAF8F5] transition-colors">
                  <div className="p-2.5 bg-rose-50 rounded-xl text-[#8b1828] shrink-0 border border-rose-100">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900">Email Inquiries</p>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="text-xs text-stone-700 hover:text-[#8b1828] transition-colors mt-0.5 block"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-[#FAF8F5] transition-colors">
                  <div className="p-2.5 bg-rose-50 rounded-xl text-[#8b1828] shrink-0 border border-rose-100">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900">Opening Hours</p>
                    <p className="text-xs text-stone-600 mt-0.5">Open 7 Days a week for wedding season fittings</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Appointment CTA */}
            <div className="pt-3 border-t border-[#F0EAE1]">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Ghar Shagna Da team, I want to book an appointment to visit your studio for bridal fitting.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 px-6 rounded-2xl text-xs sm:text-sm transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Book Appointment on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Send Quick Inquiry Form (7 Cols) */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
