import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Calendar, 
  Scissors, 
  ShieldCheck, 
  RotateCcw, 
  MessageCircle, 
  CheckCircle, 
  HelpCircle 
} from 'lucide-react';
import { SITE_CONFIG } from '@/data/products';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'How It Works | Outfit Rental Process & Fitting Guide',
  description: 'Understand the simple 4-step bridal lehenga and sherwani rental process at Ghar Shagna Da. Complimentary alterations, sanitization and refundable security deposit.',
  canonical: `${SITE_CONFIG.domain}/how-rental-works`,
  keywords: [
    'how to rent bridal lehenga',
    'wedding dress rental process',
    'sherwani rental guide',
    'lehenga rental terms and conditions',
    'Ghar Shagna Da rental policy',
  ],
});

export default function HowRentalWorksPage() {
  const steps = [
    {
      step: '01',
      title: 'Pick & Check Date Availability',
      punjabiTitle: 'Outfit Selection & Date Confirmation',
      desc: 'Browse our collection of bridal lehengas, reception gowns, and sherwanis online. Send us a message on WhatsApp or click "Enquire" with your wedding or function date to lock availability.',
    },
    {
      step: '02',
      title: 'Fitting Trial & Master Tailor Alteration',
      punjabiTitle: 'Master Tailor Fitting',
      desc: 'Book a trial appointment or submit your body measurements. Our master bridal tailors alter the blouse bust, waist, lehenga height, or sherwani sleeves so it fits you impeccably.',
    },
    {
      step: '03',
      title: 'Sanitized Packaging & Pickup',
      punjabiTitle: 'Steam Ironed & Sanitized Packaging',
      desc: 'Pick up your royal outfit 1 to 2 days prior to the wedding event in pristine garment bags. Every piece is dry-cleaned, UV/steam sanitized, and accompanied by latkans and dupattas.',
    },
    {
      step: '04',
      title: 'Return & Immediate Deposit Refund',
      punjabiTitle: 'Easy Return & Instant Deposit Refund',
      desc: 'Celebrate in royal splendour! Return the outfit to us the day after your function. You don’t need to wash or dry-clean it. Your refundable security deposit is released right away.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-16 space-y-16">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200/60 px-3.5 py-1 rounded-full text-xs font-semibold text-[#8b1828]">
          <span className="font-script text-base text-[#8b1828]">Easy & Transparent Process</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          How Rental Works at Ghar Shagna Da
        </h1>
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
          We believe renting your dream wedding outfit should be as celebratory and stress-free as your wedding day itself.
        </p>
      </div>

      {/* Steps Timeline */}
      <div className="space-y-6">
        {steps.map((st, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row items-start gap-6 bg-[#180e0f] border border-[#D4AF37]/25 p-6 sm:p-8 rounded-3xl relative overflow-hidden"
          >
            <div className="font-serif text-5xl font-black text-[#D4AF37] opacity-80 shrink-0">
              {st.step}
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {st.title}
                </h2>
                <span className="text-xs text-[#D4AF37] font-sans">
                  ({st.punjabiTitle})
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {st.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Rental Policies & Key Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#140b0c] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#D4AF37] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" /> Hygiene & Care Standards
          </h3>
          <ul className="space-y-2 text-xs text-gray-300">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Hospital grade dry-cleaning between every single booking.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Steam sanitized and sealed in luxury waterproof garment bags.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Inspection guarantee before handover so you receive pristine outfits.</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#140b0c] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#D4AF37] flex items-center gap-2">
            <RotateCcw className="w-5 h-5" /> Security Deposit & Return
          </h3>
          <ul className="space-y-2 text-xs text-gray-300">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Refundable deposit is 100% reimbursed on timely outfit return.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Minor fabric creases or normal wear & tear are completely acceptable.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>No penalty for routine event dust or dancing stains—we clean it!</span>
            </li>
          </ul>
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center bg-gradient-to-r from-[#29080e] via-[#4a121d] to-[#29080e] border border-[#D4AF37]/40 rounded-3xl p-8 space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          Have Questions About Your Upcoming Date?
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
          Talk to our bridal stylist directly on WhatsApp. We will help check outfit availability and book your trial.
        </p>
        <div className="pt-2">
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              'Hello Ghar Shagna Da team, I have a question regarding how your rental process works for my wedding.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 px-6 rounded-full text-sm shadow-lg transition-transform hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp With Our Stylist</span>
          </a>
        </div>
      </div>
    </div>
  );
}
