import { Metadata } from 'next';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Clock, 
  CalendarCheck
} from 'lucide-react';
import { SITE_CONFIG } from '@/data/products';
import { constructMetadata } from '@/lib/seo';

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200/60 px-3.5 py-1 rounded-full text-xs font-semibold text-[#8b1828]">
          <span className="font-script text-base text-[#8b1828]">Get in Touch</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          Visit Us or Send a Direct Inquiry
        </h1>
        <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
          We invite you for personalized fitting trials. Schedule your visit or chat with us online to reserve your outfit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info Card */}
        <div className="bg-[#180e0f] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#D4AF37]">
            Boutique & Studio Details
          </h2>

          <div className="space-y-5 text-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/20 text-[#D4AF37]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-white">Location / Address</p>
                <p className="text-xs text-gray-300 mt-0.5">{SITE_CONFIG.address}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Trials by appointment recommended</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/20 text-[#D4AF37]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-white">Phone Support</p>
                <p className="text-xs text-gray-300 mt-0.5">{SITE_CONFIG.phone}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Monday to Sunday, 10:00 AM - 8:30 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/20 text-[#D4AF37]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-white">Email Address</p>
                <p className="text-xs text-gray-300 mt-0.5">{SITE_CONFIG.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/20 text-[#D4AF37]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-white">Opening Hours</p>
                <p className="text-xs text-gray-300 mt-0.5">Open 7 Days a week for wedding season fittings</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello Ghar Shagna Da team, I want to book an appointment to visit your studio for bridal fitting.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 px-6 rounded-2xl text-sm transition-all shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Book Appointment on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Quick Inquiry Form */}
        <div className="bg-[#180e0f] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-[#D4AF37]" />
            <span>Send Quick Inquiry</span>
          </h2>
          <p className="text-xs text-gray-300">
            Leave your wedding date and required outfit. Our team will contact you with matching catalog choices.
          </p>

          <form
            action={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
            method="GET"
            target="_blank"
            className="space-y-4 pt-2"
          >
            <div>
              <label className="block text-xs text-gray-300 mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Jaspreet Kaur"
                className="w-full bg-[#100708] border border-[#D4AF37]/30 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300 mb-1">Looking for</label>
              <select
                name="category"
                className="w-full bg-[#100708] border border-[#D4AF37]/30 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Bridal Lehenga">Bridal Lehenga</option>
                <option value="Wedding Dress / Gown">Wedding Dress / Gown</option>
                <option value="Groom Sherwani">Groom Sherwani</option>
                <option value="Both Bridal & Groom">Both Bridal & Groom Combo</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-300 mb-1">Wedding / Function Date</label>
              <input
                type="date"
                required
                className="w-full bg-[#100708] border border-[#D4AF37]/30 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300 mb-1">Message / Questions</label>
              <textarea
                rows={3}
                placeholder="Tell us any specific color, designer style, or measurement preference..."
                className="w-full bg-[#100708] border border-[#D4AF37]/30 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-amber-400 text-black font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              Submit & Connect on WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
