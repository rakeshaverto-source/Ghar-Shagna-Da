import React from 'react';

export default function HomeHowItWorks() {
  return (
    <section className="bg-[#FCFAF7] border-y border-[#F3EDE5] py-7 sm:py-9 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-1 max-w-2xl mx-auto">
          <p className="font-script text-2xl sm:text-3xl text-[#8b1828]">
            Effortless Journey
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] font-bold text-stone-900 tracking-tight leading-tight">
            How Outfit Rental Works
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-light max-w-lg mx-auto pt-1">
            Simple 4 steps designed for zero stress and complete bridal perfection.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 items-stretch">
          {/* Step 01 */}
          <div className="relative flex">
            <div className="group w-full bg-white rounded-[24px] p-8 sm:p-9 border border-[#F6EBEA] shadow-[0_8px_30px_rgba(235,185,188,0.12)] hover:shadow-[0_14px_35px_rgba(200,120,130,0.18)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-serif-luxury text-[34px] sm:text-[38px] font-bold text-[#E5A8A9] tracking-wide select-none leading-none block">
                      01
                    </span>
                    <div className="w-9 h-[2px] bg-[#EBB4B6] rounded-full mt-3 mb-5" />
                  </div>
                  <div className="w-20 h-20 rounded-full bg-[#FAF0F0] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0 relative">
                    <svg
                      className="w-11 h-11 text-[#A85860]"
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 6a2 2 0 0 1 2 2c0 .8-.5 1.5-1.2 1.8L20 12l-4 1-4-1 3.2-2.2A2 2 0 0 1 16 6z" />
                      <path d="M12 12l-3 15h14l-3-15" />
                      <line x1="9" y1="27" x2="23" y2="27" />
                      <path
                        d="M25 7l.5 1.5L27 9l-1.5.5L25 11l-.5-1.5L23 9l1.5-.5z"
                        fill="currentColor"
                        stroke="none"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="font-serif-luxury text-xl sm:text-[22px] font-bold text-stone-900 tracking-tight mb-3 leading-snug">
                  Choose<br />Outfit
                </h3>
                <p className="text-[13px] text-stone-600 leading-relaxed font-normal">
                  Browse our designer bridal lehengas, gowns, & sherwanis online or schedule a VIP in-store trial styling appointment.
                </p>
              </div>
            </div>
            <div className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 w-8 z-10 pointer-events-none">
              <svg className="w-8 h-6 text-[#EBB4B6]" viewBox="0 0 32 24" fill="none">
                <path d="M2 14 C 10 6, 20 22, 28 12" stroke="currentColor" strokeWidth="1.75" strokeDasharray="3 3.5" />
                <path d="M23 8 L 29 12 L 24 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Step 02 */}
          <div className="relative flex">
            <div className="group w-full bg-white rounded-[24px] p-8 sm:p-9 border border-[#F6EBEA] shadow-[0_8px_30px_rgba(235,185,188,0.12)] hover:shadow-[0_14px_35px_rgba(200,120,130,0.18)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-serif-luxury text-[34px] sm:text-[38px] font-bold text-[#E5A8A9] tracking-wide select-none leading-none block">
                      02
                    </span>
                    <div className="w-9 h-[2px] bg-[#EBB4B6] rounded-full mt-3 mb-5" />
                  </div>
                  <div className="w-20 h-20 rounded-full bg-[#FAF0F0] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0 relative">
                    <svg
                      className="w-11 h-11 text-[#A85860]"
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <ellipse cx="14" cy="16" rx="7" ry="5" />
                      <ellipse cx="14" cy="15" rx="4" ry="2.5" />
                      <path d="M14 21c4 0 11 0 13 0s1-2 1-3-1-3-3-3h-11" />
                      <line x1="18" y1="18" x2="18" y2="21" />
                      <line x1="21" y1="18" x2="21" y2="21" />
                      <line x1="24" y1="18" x2="24" y2="21" />
                      <path
                        d="M26 10l.5 1.5L28 12l-1.5.5L26 14l-.5-1.5L24 12l1.5-.5z"
                        fill="currentColor"
                        stroke="none"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="font-serif-luxury text-xl sm:text-[22px] font-bold text-stone-900 tracking-tight mb-3 leading-snug">
                  Custom<br />Fitting
                </h3>
                <p className="text-[13px] text-stone-600 leading-relaxed font-normal">
                  Visit our boutique or provide your body measurements. Our Experienced master tailors will customize the outfit according to your body Size.
                </p>
              </div>
            </div>
            <div className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 w-8 z-10 pointer-events-none">
              <svg className="w-8 h-6 text-[#EBB4B6]" viewBox="0 0 32 24" fill="none">
                <path d="M2 14 C 10 6, 20 22, 28 12" stroke="currentColor" strokeWidth="1.75" strokeDasharray="3 3.5" />
                <path d="M23 8 L 29 12 L 24 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Step 03 */}
          <div className="relative flex">
            <div className="group w-full bg-white rounded-[24px] p-8 sm:p-9 border border-[#F6EBEA] shadow-[0_8px_30px_rgba(235,185,188,0.12)] hover:shadow-[0_14px_35px_rgba(200,120,130,0.18)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-serif-luxury text-[34px] sm:text-[38px] font-bold text-[#E5A8A9] tracking-wide select-none leading-none block">
                      03
                    </span>
                    <div className="w-9 h-[2px] bg-[#EBB4B6] rounded-full mt-3 mb-5" />
                  </div>
                  <div className="w-20 h-20 rounded-full bg-[#FAF0F0] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0 relative">
                    <svg
                      className="w-11 h-11 text-[#A85860]"
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 6a2 2 0 0 1 2 2c0 .8-.5 1.5-1.2 1.8V11" />
                      <path d="M11 11l5-1.5 5 1.5v14a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2V11z" />
                      <line x1="16" y1="11" x2="16" y2="27" />
                      <path
                        d="M24 14l.5 1.2L26 16l-1.5.5L24 18l-.5-1.5L22 16l1.5-.8z"
                        fill="currentColor"
                        stroke="none"
                      />
                      <path
                        d="M7 18l.4 1L9 19.5l-1.6.4L7 21l-.4-1.1L5 19.5l1.6-.4z"
                        fill="currentColor"
                        stroke="none"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="font-serif-luxury text-xl sm:text-[22px] font-bold text-stone-900 tracking-tight mb-3 leading-snug">
                  Sanitized<br />Pickup
                </h3>
                <p className="text-[13px] text-stone-600 leading-relaxed font-normal">
                  Receive the steam-sterilized outfit sealed in luxury garment packaging as per your requirement before your wedding ceremonies.
                </p>
              </div>
            </div>
            <div className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 w-8 z-10 pointer-events-none">
              <svg className="w-8 h-6 text-[#EBB4B6]" viewBox="0 0 32 24" fill="none">
                <path d="M2 14 C 10 6, 20 22, 28 12" stroke="currentColor" strokeWidth="1.75" strokeDasharray="3 3.5" />
                <path d="M23 8 L 29 12 L 24 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Step 04 */}
          <div className="relative flex">
            <div className="group w-full bg-white rounded-[24px] p-8 sm:p-9 border border-[#F6EBEA] shadow-[0_8px_30px_rgba(235,185,188,0.12)] hover:shadow-[0_14px_35px_rgba(200,120,130,0.18)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-serif-luxury text-[34px] sm:text-[38px] font-bold text-[#E5A8A9] tracking-wide select-none leading-none block">
                      04
                    </span>
                    <div className="w-9 h-[2px] bg-[#EBB4B6] rounded-full mt-3 mb-5" />
                  </div>
                  <div className="w-20 h-20 rounded-full bg-[#FAF0F0] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0 relative">
                    <svg
                      className="w-11 h-11 text-[#A85860]"
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 16a11 11 0 1 0 3.2-7.8L5 11" />
                      <path d="M5 5v6h6" />
                      <path d="M21 5l2 3-3 2" />
                      <path
                        d="M6 18l.4 1L8 19.5l-1.6.4L6 21l-.4-1.1L4 19.5l1.6-.4z"
                        fill="currentColor"
                        stroke="none"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="font-serif-luxury text-xl sm:text-[22px] font-bold text-stone-900 tracking-tight mb-3 leading-snug">
                  Easy<br />Return
                </h3>
                <p className="text-[13px] text-stone-600 leading-relaxed font-normal">
                  Return the outfit after Enjoying your event without dry-cleaning it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
