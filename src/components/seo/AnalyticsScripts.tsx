'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

interface PageSeoItem {
  pagePath: string;
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}

interface TrackingData {
  googleSearchConsoleToken: string;
  googleAnalyticsId: string;
  metaPixelId: string;
  customSchemaJson?: string;
  pageSeoList?: PageSeoItem[];
}

export default function AnalyticsScripts() {
  const pathname = usePathname();
  const [tracking, setTracking] = useState<TrackingData>({
    googleSearchConsoleToken: '',
    googleAnalyticsId: '',
    metaPixelId: '',
    customSchemaJson: '',
    pageSeoList: [],
  });

  useEffect(() => {
    // Fetch live tracking and page SEO settings from the API
    fetch('/api/hero')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const gsc = data.googleSearchConsoleToken || '';
          const customSchema = data.customSchemaJson || '';
          const seoList: PageSeoItem[] = data.pageSeoList || [];

          setTracking({
            googleSearchConsoleToken: gsc,
            googleAnalyticsId: data.googleAnalyticsId || '',
            metaPixelId: data.metaPixelId || '',
            customSchemaJson: customSchema,
            pageSeoList: seoList,
          });

          // 1. Google Search Console meta tag
          if (gsc) {
            let metaTag = document.querySelector('meta[name="google-site-verification"]');
            if (!metaTag) {
              metaTag = document.createElement('meta');
              metaTag.setAttribute('name', 'google-site-verification');
              document.head.appendChild(metaTag);
            }
            metaTag.setAttribute('content', gsc);
          }

          // 2. Custom Schema.org JSON-LD
          if (customSchema) {
            let schemaScript = document.getElementById('custom-schema-jsonld') as HTMLScriptElement | null;
            if (!schemaScript) {
              schemaScript = document.createElement('script');
              schemaScript.id = 'custom-schema-jsonld';
              schemaScript.type = 'application/ld+json';
              document.head.appendChild(schemaScript);
            }
            try {
              const parsed = JSON.parse(customSchema);
              schemaScript.textContent = JSON.stringify(parsed);
            } catch {
              schemaScript.textContent = customSchema;
            }
          }
        }
      })
      .catch((err) => {
        console.error('Failed to load tracking settings:', err);
      });
  }, []);

  // 3. Single-source Conflict-Free Page SEO applicator (runs on every route navigation)
  useEffect(() => {
    if (!tracking.pageSeoList || tracking.pageSeoList.length === 0) return;

    // Normalize paths e.g. "/catalog/" -> "/catalog"
    const currentPath = pathname.replace(/\/$/, '') || '/';
    const pageConfig = tracking.pageSeoList.find((p) => {
      const pPath = p.pagePath.replace(/\/$/, '') || '/';
      return pPath === currentPath;
    });

    if (!pageConfig) return;

    // Conflict-free replacement helper to prevent duplicates
    const updateOrCreateMeta = (selector: string, attrName: string, attrVal: string, content: string) => {
      if (!content) return;
      // Remove all existing duplicates first to ensure only 1 clean tag exists
      const existingTags = document.querySelectorAll(selector);
      existingTags.forEach((tag) => tag.remove());

      const newMeta = document.createElement('meta');
      newMeta.setAttribute(attrName, attrVal);
      newMeta.setAttribute('content', content);
      document.head.appendChild(newMeta);
    };

    // Update Title cleanly
    if (pageConfig.title && pageConfig.title.trim()) {
      document.title = pageConfig.title.trim();
    }

    // Update Meta Description cleanly (No duplicate)
    if (pageConfig.description && pageConfig.description.trim()) {
      updateOrCreateMeta('meta[name="description"]', 'name', 'description', pageConfig.description.trim());
      updateOrCreateMeta('meta[property="og:description"]', 'property', 'og:description', pageConfig.description.trim());
      updateOrCreateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', pageConfig.description.trim());
    }

    // Update Meta Keywords cleanly
    if (pageConfig.keywords && pageConfig.keywords.trim()) {
      updateOrCreateMeta('meta[name="keywords"]', 'name', 'keywords', pageConfig.keywords.trim());
    }

    // Update OG Title cleanly
    if (pageConfig.title && pageConfig.title.trim()) {
      updateOrCreateMeta('meta[property="og:title"]', 'property', 'og:title', pageConfig.title.trim());
      updateOrCreateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', pageConfig.title.trim());
    }

    // Update OG Image cleanly
    if (pageConfig.ogImage && pageConfig.ogImage.trim()) {
      updateOrCreateMeta('meta[property="og:image"]', 'property', 'og:image', pageConfig.ogImage.trim());
      updateOrCreateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', pageConfig.ogImage.trim());
    }

    // Update Canonical URL cleanly
    if (pageConfig.canonical && pageConfig.canonical.trim()) {
      const existingCanonicals = document.querySelectorAll('link[rel="canonical"]');
      existingCanonicals.forEach((c) => c.remove());

      const link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', pageConfig.canonical.trim());
      document.head.appendChild(link);
    }

    // Robots noindex if specified
    if (pageConfig.noIndex) {
      updateOrCreateMeta('meta[name="robots"]', 'name', 'robots', 'noindex, nofollow');
    }
  }, [pathname, tracking.pageSeoList]);

  const { googleAnalyticsId, metaPixelId } = tracking;

  return (
    <>
      {/* 📊 Google Analytics 4 (GA4) */}
      {googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* 🎯 Meta (Facebook) Pixel */}
      {metaPixelId && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
    </>
  );
}
