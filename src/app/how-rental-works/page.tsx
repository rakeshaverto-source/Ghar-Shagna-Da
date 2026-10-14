import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Calendar, 
  Scissors, 
  ShieldCheck, 
  RotateCcw, 
  MessageCircle, 
  CheckCircle2, 
  HelpCircle,
  Sparkles,
  ArrowRight,
  Shirt,
  HeartHandshake
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
      title: 'Choose Your Dream Outfit',
      punjabiTitle: 'Outfit Selection & Date Confirmation',
      desc: 'Browse through hundreds of handcrafted bridal lehengas, reception trail gowns, and groom sherwanis online or at our boutique. Lock your wedding or Anand Karaj date with a quick inquiry.',
      icon: Shirt,
      tag: 'Step 1'
    },
    {
      step: '02',
      title: 'Free Master Tailor Alteration',
      punjabiTitle: 'Custom Trial & Master Tailor Fitting',
      desc: 'Visit our studio for an in-person trial or share your body measurements online. Our master bridal karigars alter the blouse bust, waist, lehenga height, and sherwani sleeves for your flawless fit.',
      icon: Scissors,
      tag: 'Step 2'
    },
    {
      step: '03',
      title: 'Pristine Sanitized Handover',
      punjabiTitle: 'Steam Ironed & Sanitized Garment Box',
      desc: 'We hand over or deliver your sanitized outfit as per your requirement prior to your special function. Every ensemble is hospital-grade steam sanitized, dry-cleaned, and carefully packaged in luxury garment bags with all accessories.',
      icon: ShieldCheck,
      tag: 'Step 3'
    },
    {
      step: '04',
      title: 'Effortless Return & Instant Deposit Release',
      punjabiTitle: 'Stress-Free Return & 100% Refund',
      desc: 'Twirl and celebrate memories! Return the outfit to our studio the day after your function. You don’t need to wash or dry-clean anything—we handle it all, and your refundable deposit is released immediately.',
      icon: RotateCcw,
      tag: 'Step 4'
    },
  ];

  const faqs = [
    {
      q: 'Kitne din pehle booking karni chahidi hai?',
      a: 'Tusi 2 to 3 months pehle advance book kar sakde ho taaki aapdi favorite bridal lehenga ya sherwani aapdi wedding date te locked rahe.'
    },
    {
      q: 'Ki alterations de extra charges hunde ne?',
      a: 'Nahi! Har rental booking naal master karigar custom fitting & blouse alterations 100% free provide karde ne.'
    },
    {
      q: 'Security deposit kado wapas milda hai?',
      a: 'Event de agle din jado tusi outfit return karde ho, osey waqt outfit inspection karke aapda refundable security deposit instantly transfer ho janda hai.'
    },
    {
      q: 'Agar dress te dance karde koi stain lag jaave?',
      a: 'Routine event dust ya normal dancing creases di koi tension nahi—dry-cleaning te sanitization sade wallon bilkul included hundi hai.'
    }
  ];

  return (
    <div className="bg-[#FAF8F5]/60 min-h-screen pt-28 sm:pt-36 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Luxury Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200/80 px-4 py-1.5 rounded-full shadow-2xs">
            <span className="font-script text-lg text-[#8b1828] font-bold">Easy, Transparent & Royal</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight">
            How Rental Works at Ghar Shagna Da
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal max-w-2xl mx-auto">
            We believe renting your dream couture outfit should be as celebratory and stress-free as your wedding day itself. Here is our seamless 4-step process.
          </p>
        </div>

        {/* 4-Step Visual Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                className="bg-white border border-[#EDE4D8] rounded-3xl p-7 sm:p-9 shadow-[0_6px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(139,24,40,0.08)] hover:border-amber-300/80 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
              >
                {/* Step watermarked number in top-right */}
                <div className="absolute top-4 right-6 font-serif-luxury text-6xl font-black text-stone-100 select-none group-hover:text-rose-100/60 transition-colors pointer-events-none">
                  {st.step}
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200/70 text-[#8b1828] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#8b1828] group-hover:text-white transition-all duration-300 shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8b1828] bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200/60">
                        {st.tag}
                      </span>
                      <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                        {st.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-5 mt-4 border-t border-[#F0EAE1] flex items-center justify-between">
                  <span className="text-xs font-serif font-bold text-[#8b1828]">
                    {st.punjabiTitle}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-stone-100 group-hover:bg-rose-50 group-hover:text-[#8b1828] text-stone-400 flex items-center justify-center transition-colors text-xs">
                    ✓
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2 Feature Cards: Hygiene Standards & Security Deposit Policy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Hygiene & Alteration Guarantee */}
          <div className="bg-white border border-[#EDE4D8] rounded-3xl p-7 sm:p-9 shadow-[0_6px_25px_rgba(0,0,0,0.03)] space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 border-b border-[#F0EAE1] pb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700">100% Quality Assured</span>
                  <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                    Hygiene & Care Standards
                  </h3>
                </div>
              </div>

              <ul className="space-y-3.5 pt-4 text-xs sm:text-sm text-stone-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Hospital-grade dry cleaning</strong> & UV steam sanitization between every single booking.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Complimentary alteration</strong> by master bridal tailors to fit your unique body measurements.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Delivered in <strong>sealed, luxury waterproof garment boxes</strong> with latkans, dupattas & matching accessories.</span>
                </li>
              </ul>
            </div>

            <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-stone-200/80 text-[11px] text-stone-500">
              Every outfit is hand-inspected by our head stylist before handover.
            </div>
          </div>

          {/* Card 2: Security Deposit & Easy Return */}
          <div className="bg-white border border-[#EDE4D8] rounded-3xl p-7 sm:p-9 shadow-[0_6px_25px_rgba(0,0,0,0.03)] space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 border-b border-[#F0EAE1] pb-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700">Fair & Transparent</span>
                  <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                    Refundable Deposit & Returns
                  </h3>
                </div>
              </div>

              <ul className="space-y-3.5 pt-4 text-xs sm:text-sm text-stone-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>100% refundable security deposit</strong> is released instantly upon outfit return.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>No dry-cleaning required</strong> from your side—just return as is after your event.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Normal wear & event dancing creases are completely acceptable with no extra penalty.</span>
                </li>
              </ul>
            </div>

            <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-stone-200/80 text-[11px] text-stone-500">
              Immediate refund via UPI, cash or bank transfer on return day.
            </div>
          </div>
        </div>

        {/* FAQs Accordion-style Grid */}
        <div className="bg-white border border-[#EDE4D8] rounded-3xl p-8 sm:p-10 shadow-[0_6px_25px_rgba(0,0,0,0.03)] space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8b1828] bg-rose-50 px-3 py-1 rounded-full border border-rose-200/60">
              Frequently Asked Questions
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900">
              Common Rental Questions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
            {faqs.map((f, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-2">
                <h4 className="font-bold text-xs sm:text-sm text-stone-900 flex items-start gap-2">
                  <span className="text-[#8b1828] font-bold">Q.</span>
                  <span>{f.q}</span>
                </h4>
                <p className="text-xs text-stone-600 pl-4 leading-relaxed">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Luxury Action Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#8b1828] via-[#70121f] to-[#550d18] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-3 relative z-10">
            <span className="text-[11px] uppercase tracking-widest font-bold text-amber-200">
              Ready to Look Regal?
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold">
              Find Your Dream Bridal or Groom Wear
            </h2>
            <p className="text-xs sm:text-sm text-rose-100 font-normal leading-relaxed">
              Browse our complete rental catalogue or contact our stylists directly to schedule your custom trial.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5 relative z-10">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-6 py-3 rounded-2xl text-xs sm:text-sm transition-all shadow-md active:scale-95"
            >
              <span>Explore Outfits Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-2xl text-xs sm:text-sm border border-white/25 transition-all active:scale-95"
            >
              <span>Book In-Store Trial</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
