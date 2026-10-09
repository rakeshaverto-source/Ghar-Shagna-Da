import type { Metadata } from 'next';
import { Inter, Playfair_Display, Dancing_Script, Cinzel } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LocalBusinessJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd';
import AnalyticsScripts from '@/components/seo/AnalyticsScripts';
import { constructMetadata } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-cinzel',
  display: 'swap',
});

const dancingScript = Dancing_Script({
  weight: ['600', '700'],
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cinzel.variable} ${dancingScript.variable} scroll-smooth`}>
      <head>
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-stone-900 selection:bg-[#8b1828] selection:text-white antialiased">
        <AnalyticsScripts />
        <Header />
        <main className="flex-grow bg-white">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
