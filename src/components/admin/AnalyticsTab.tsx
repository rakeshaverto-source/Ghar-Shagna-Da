'use client';

import React, { useState } from 'react';
import { AnalyticsSettings } from './types';
import {
  Search,
  BarChart3,
  Share2,
  Code,
  Save,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  Info,
  Check,
  CheckCircle2,
} from 'lucide-react';

interface AnalyticsTabProps {
  analyticsSettings: AnalyticsSettings;
  setAnalyticsSettings: React.Dispatch<React.SetStateAction<AnalyticsSettings>>;
  handleSaveAnalyticsSettings: (e: React.FormEvent) => Promise<void>;
  isSaving: boolean;
  saveMessage?: string;
}

export default function AnalyticsTab({
  analyticsSettings,
  setAnalyticsSettings,
  handleSaveAnalyticsSettings,
  isSaving,
  saveMessage,
}: AnalyticsTabProps) {
  const [extractedNotice, setExtractedNotice] = useState<string>('');

  // Handle Google Search Console input and automatically extract content if full meta tag is pasted
  const handleGscChange = (val: string) => {
    let cleaned = val.trim();
    const match = cleaned.match(/content=["']([^"']+)["']/i);
    if (match && match[1]) {
      cleaned = match[1];
      setExtractedNotice('Token automatically extracted from meta tag successfully.');
      setTimeout(() => setExtractedNotice(''), 4000);
    }
    setAnalyticsSettings((prev) => ({
      ...prev,
      googleSearchConsoleToken: cleaned,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner / Info Card */}
      <div className="bg-gradient-to-r from-stone-900 via-[#8b1828] to-stone-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium tracking-wide uppercase mb-3 text-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Analytics & Verification Tracking
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2 text-white">
            Google Search Console, GA4 & Meta Pixel
          </h2>
          <p className="text-stone-200 text-sm leading-relaxed max-w-2xl">
            Configure your site verification tokens, Google Analytics 4 stream, and Meta Pixel for ad conversions. Changes are applied globally to all pages.
          </p>
        </div>
      </div>

      {/* Helper Note Banner */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-900">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-sm leading-relaxed">
          <span className="font-semibold block text-stone-900">Tracking Code Setup:</span>
          Paste your actual Google Search Console verification token, GA4 measurement ID, and Meta Pixel dataset ID. For individual page meta tags, use the &quot;Per-Page SEO&quot; tab in the sidebar.
        </div>
      </div>

      {/* Success notification banner if saved */}
      {saveMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center gap-3 text-emerald-900 text-sm font-medium animate-in fade-in shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSaveAnalyticsSettings} className="space-y-6">
        {/* 1. Google Search Console Verification Token */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4 transition-shadow hover:shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center justify-center shrink-0">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 text-base">
                  Google Search Console Verification Token
                </h3>
                <p className="text-sm text-stone-500 mt-0.5">
                  Verifies site ownership in Google Search Console to monitor search queries and index pages.
                </p>
              </div>
            </div>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${
                analyticsSettings.googleSearchConsoleToken
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-stone-100 text-stone-600'
              }`}
            >
              {analyticsSettings.googleSearchConsoleToken ? 'Configured' : 'Not Set'}
            </span>
          </div>

          <div className="space-y-2 pt-1">
            <label className="block text-sm font-medium text-stone-800">
              Verification Token or HTML Meta Tag
            </label>
            <div className="relative">
              <input
                type="text"
                value={analyticsSettings.googleSearchConsoleToken}
                onChange={(e) => handleGscChange(e.target.value)}
                placeholder="Paste token or meta tag (e.g. Fk415jtiCwFTKxw-Z1NITFnC2udRITDdFs-Wj9Lvg7w)"
                className="w-full text-sm px-4 py-3 rounded-xl border border-stone-300 bg-stone-50/40 text-stone-900 focus:bg-white focus:outline-none focus:border-[#8b1828] focus:ring-3 focus:ring-[#8b1828]/10 transition-all font-mono"
              />
            </div>
            {extractedNotice && (
              <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5 mt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {extractedNotice}
              </p>
            )}
            <p className="text-xs text-stone-500 flex items-center gap-2 mt-1.5 leading-normal">
              <HelpCircle className="w-4 h-4 text-stone-400 shrink-0" />
              You can paste either the raw verification token or the entire tag{' '}
              <code className="bg-stone-100 border border-stone-200 px-1.5 py-0.5 rounded text-xs text-stone-800 font-mono">
                &lt;meta name=&quot;google-site-verification&quot; content=&quot;...&quot;&gt;
              </code>
              . The exact token code will be extracted automatically.
            </p>
          </div>
        </div>

        {/* 2. Google Analytics 4 (GA4) */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4 transition-shadow hover:shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 text-base">
                  Google Analytics 4 (GA4) Measurement ID
                </h3>
                <p className="text-sm text-stone-500 mt-0.5">
                  Tracks visitor counts, session channels, page engagement, and bridal collection views.
                </p>
              </div>
            </div>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${
                analyticsSettings.googleAnalyticsId
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-stone-100 text-stone-600'
              }`}
            >
              {analyticsSettings.googleAnalyticsId ? 'Configured' : 'Not Set'}
            </span>
          </div>

          <div className="space-y-2 pt-1">
            <label className="block text-sm font-medium text-stone-800">
              Measurement ID (Format: G-XXXXXXXXXX)
            </label>
            <input
              type="text"
              value={analyticsSettings.googleAnalyticsId}
              onChange={(e) =>
                setAnalyticsSettings((prev) => ({
                  ...prev,
                  googleAnalyticsId: e.target.value.trim(),
                }))
              }
              placeholder="e.g. G-RE5ENQC7MT"
              className="w-full text-sm px-4 py-3 rounded-xl border border-stone-300 bg-stone-50/40 text-stone-900 focus:bg-white focus:outline-none focus:border-[#8b1828] focus:ring-3 focus:ring-[#8b1828]/10 transition-all font-mono"
            />
            <p className="text-xs text-stone-500 flex items-center gap-2 mt-1.5 leading-normal">
              <HelpCircle className="w-4 h-4 text-stone-400 shrink-0" />
              Locate this in Google Analytics → Admin → Data Streams → Web Stream → Measurement ID.
            </p>
          </div>
        </div>

        {/* 3. Meta (Facebook) Pixel ID */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4 transition-shadow hover:shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 border border-purple-200/60 flex items-center justify-center shrink-0">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 text-base">
                  Meta (Facebook & Instagram) Pixel ID
                </h3>
                <p className="text-sm text-stone-500 mt-0.5">
                  Tracks conversions and creates custom retargeting audiences for Instagram & Facebook ads.
                </p>
              </div>
            </div>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${
                analyticsSettings.metaPixelId
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-stone-100 text-stone-600'
              }`}
            >
              {analyticsSettings.metaPixelId ? 'Configured' : 'Not Set'}
            </span>
          </div>

          <div className="space-y-2 pt-1">
            <label className="block text-sm font-medium text-stone-800">
              Pixel Dataset ID
            </label>
            <input
              type="text"
              value={analyticsSettings.metaPixelId}
              onChange={(e) =>
                setAnalyticsSettings((prev) => ({
                  ...prev,
                  metaPixelId: e.target.value.trim(),
                }))
              }
              placeholder="e.g. 123456789012345"
              className="w-full text-sm px-4 py-3 rounded-xl border border-stone-300 bg-stone-50/40 text-stone-900 focus:bg-white focus:outline-none focus:border-[#8b1828] focus:ring-3 focus:ring-[#8b1828]/10 transition-all font-mono"
            />
            <p className="text-xs text-stone-500 flex items-center gap-2 mt-1.5 leading-normal">
              <HelpCircle className="w-4 h-4 text-stone-400 shrink-0" />
              Found in Meta Events Manager → Datasets → Pixel ID.
            </p>
          </div>
        </div>

        {/* 4. Automated Fixed Schema.org Info */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5 transition-shadow hover:shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center justify-center shrink-0">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 text-base">
                  Schema.org Structured Data (JSON-LD)
                </h3>
                <p className="text-sm text-stone-500 mt-0.5">
                  Rich search engine snippets for Google search rankings and rich card results.
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
              Auto Fixed & Active
            </span>
          </div>

          {/* Built-in schemas status cards */}
          <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
              Automated Page-by-Page Structured Schemas:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
              <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-stone-200">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900 block">ClothingStore & LocalBusiness</span>
                  <span className="text-stone-500 text-[11px]">Applied across entire site (Address, Timing, Phone, Map Geo coordinates).</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-stone-200">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900 block">WebSite & Sitelinks SearchBox</span>
                  <span className="text-stone-500 text-[11px]">Enables direct brand search in Google search result cards.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-stone-200">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900 block">Product & Lease Offers</span>
                  <span className="text-stone-500 text-[11px]">Automatically injected on all product pages with INR rental pricing and availability.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-stone-200">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900 block">BreadcrumbList Schema</span>
                  <span className="text-stone-500 text-[11px]">Active on Category and Product pages for hierarchical navigation snippets.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Saved directly to MongoDB and applied across the entire storefront</span>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#8b1828] hover:bg-[#721320] disabled:bg-stone-300 text-white px-7 py-3 rounded-xl text-sm font-semibold transition-all shadow-md shadow-[#8b1828]/20 active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Settings...' : 'Save Tracking Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
