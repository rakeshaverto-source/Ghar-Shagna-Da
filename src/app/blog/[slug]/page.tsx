import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { INITIAL_BLOG_POSTS, BlogPostItem } from '@/data/blogs';
import { SITE_CONFIG, CATEGORIES } from '@/data/products';
import BlogPost from '@/models/BlogPost';
import { connectDB } from '@/lib/mongodb';
import { Clock, ArrowLeft, Share2, MessageCircle, Phone, Tag, ChevronRight, ShieldCheck, CalendarCheck, CheckCircle2 } from 'lucide-react';

import { connection } from 'next/server';
import { BlogPostingJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const instant = false;

interface Props {
  params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string): Promise<BlogPostItem | null> {
  try {
    await connection();
    const conn = await connectDB();
    if (!conn) {
      const found = INITIAL_BLOG_POSTS.find((p) => p.slug === slug);
      return found || null;
    }
    const post = await BlogPost.findOne({ slug });
    if (!post) {
      const fallback = INITIAL_BLOG_POSTS.find((p) => p.slug === slug);
      return fallback || null;
    }
    return JSON.parse(JSON.stringify(post));
  } catch (err) {
    console.error('Failed to query blog post:', err);
    return INITIAL_BLOG_POSTS.find((p) => p.slug === slug) || null;
  }
}

async function getRecentPosts(currentSlug: string): Promise<BlogPostItem[]> {
  try {
    await connection();
    const conn = await connectDB();
    if (!conn) {
      return INITIAL_BLOG_POSTS.filter((p) => p.slug !== currentSlug).slice(0, 4);
    }
    const posts = await BlogPost.find({ slug: { $ne: currentSlug }, isPublished: true })
      .sort({ publishedAt: -1 })
      .limit(4);
    return JSON.parse(JSON.stringify(posts));
  } catch {
    return INITIAL_BLOG_POSTS.filter((p) => p.slug !== currentSlug).slice(0, 4);
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) {
    return {
      title: 'Article Not Found | Ghar Shagna Da',
      robots: { index: false, follow: false },
    };
  }

  const finalTitle = post.metaTitle?.trim() || `${post.title} | Ghar Shagna Da Bridal Blog`;
  const finalDescription = post.metaDescription?.trim() || post.excerpt;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: post.tags?.join(', ') || 'bridal rental, ghar shagna da',
    alternates: { canonical: `https://gharshagnada.com/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      url: `https://gharshagnada.com/blog/${post.slug}`,
      title: finalTitle,
      description: finalDescription,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const recentPosts = await getRecentPosts(post.slug);

  // Render markdown paragraphs / headers cleanly with luxury editorial typography
  const renderFormattedContent = (content: string) => {
    const lines = content.trim().split('\n');
    let firstHeadingSeen = false;

    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith('#### ')) {
        return (
          <div key={idx} className="mt-6 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b1828]" />
            <h4 className="font-serif-luxury text-base sm:text-lg font-bold text-stone-900 tracking-tight">
              {trimmed.replace('#### ', '')}
            </h4>
          </div>
        );
      }
      if (trimmed.startsWith('### ')) {
        const isFirst = !firstHeadingSeen;
        firstHeadingSeen = true;
        return (
          <div key={idx} className={isFirst ? "mb-3" : "mt-8 mb-3 pt-3 border-t border-[#f0eae1]"}>
            <h3 className="font-serif-luxury text-lg sm:text-2xl font-bold text-[#8b1828] tracking-tight leading-snug">
              {trimmed.replace('### ', '')}
            </h3>
          </div>
        );
      }
      if (trimmed.startsWith('## ')) {
        firstHeadingSeen = true;
        return (
          <h2 key={idx} className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900 mt-6 mb-3 tracking-tight leading-tight">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        return (
          <div key={idx} className="flex items-start gap-3 my-2.5 pl-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#8b1828] mt-2.5 shrink-0" />
            <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed flex-1">
              <span
                dangerouslySetInnerHTML={{
                  __html: trimmed
                    .substring(2)
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-stone-950 font-bold">$1</strong>'),
                }}
              />
            </p>
          </div>
        );
      }
      if (/^\d+\.\s/.test(trimmed)) {
        const numMatch = trimmed.match(/^(\d+)\.\s/);
        const num = numMatch ? numMatch[1] : '1';
        return (
          <div key={idx} className="flex items-start gap-3 my-3 pl-2">
            <span className="w-6 h-6 rounded-full bg-rose-50 border border-rose-200 text-[#8b1828] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              {num}
            </span>
            <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed flex-1">
              <span
                dangerouslySetInnerHTML={{
                  __html: trimmed
                    .replace(/^\d+\.\s/, '')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-stone-950 font-bold">$1</strong>'),
                }}
              />
            </p>
          </div>
        );
      }

      return (
        <p
          key={idx}
          className="text-stone-700 text-sm sm:text-[15.5px] leading-relaxed mb-4 font-normal"
          dangerouslySetInnerHTML={{
            __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-stone-950 font-bold">$1</strong>'),
          }}
        />
      );
    });
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 sm:pt-36 pb-20">
      {/* Schema.org Structured Data */}
      <BlogPostingJsonLd
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.excerpt}
        slug={post.slug}
        date={post.publishedAt || '2026-01-01'}
        author={post.author || 'Ghar Shagna Da Editorial Team'}
        image={post.coverImage}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_CONFIG.domain },
          { name: 'Wedding Blog', url: `${SITE_CONFIG.domain}/blog` },
          { name: post.title, url: `${SITE_CONFIG.domain}/blog/${post.slug}` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-[#8b1828] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Stories</span>
          </Link>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `Check out this bridal guide: ${post.title} - https://gharshagnada.com/blog/${post.slug}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border border-[#25D366]/20"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share on WhatsApp</span>
          </a>
        </div>

        {/* 2-COLUMN LUXURY EDITORIAL LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: MAIN ARTICLE CONTENT (8 COLS) */}
          <article className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-[#EBE3D7] shadow-xs">
            {/* Category & Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mb-4">
              <span className="bg-[#8b1828] text-white px-3.5 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] shadow-xs">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-stone-400" /> {post.readTime}
              </span>
              <span className="text-stone-300">•</span>
              <span className="font-medium text-stone-500">
                {post.publishedAt
                  ? new Intl.DateTimeFormat('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      timeZone: 'UTC',
                    }).format(new Date(post.publishedAt))
                  : 'Recently Published'}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif-luxury text-2xl sm:text-4xl lg:text-[42px] font-bold text-stone-900 leading-tight mb-6 tracking-tight">
              {post.title}
            </h1>

            {/* Author info */}
            <div className="flex items-center gap-3.5 pb-6 border-b border-stone-100 mb-8">
              <div className="w-11 h-11 rounded-full bg-[#8b1828] text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0 border-2 border-rose-100">
                {post.author ? post.author.charAt(0).toUpperCase() : 'G'}
              </div>
              <div>
                <p className="text-sm font-bold text-stone-900 leading-tight">{post.author}</p>
                <p className="text-xs text-stone-500 mt-0.5">{post.authorRole || 'Bridal Stylist & Specialist'}</p>
              </div>
            </div>

            {/* Cover Image - Top aligned with proper aspect ratio */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-8 shadow-md border border-stone-100 bg-stone-100">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 750px"
                className="object-cover object-center"
              />
            </div>

            {/* Lead Excerpt */}
            {post.excerpt && (
              <div className="bg-[#faf6f0] rounded-xl px-5 py-3.5 border-l-4 border-[#8b1828] shadow-xs mb-6 text-stone-800 italic text-xs sm:text-sm leading-relaxed flex items-center gap-3">
                <span className="font-serif text-[#8b1828] text-2xl font-bold leading-none select-none opacity-40 shrink-0">&ldquo;</span>
                <p className="font-normal text-stone-700">
                  {post.excerpt}
                </p>
              </div>
            )}

            {/* Rich Body Content */}
            <div className="prose prose-stone max-w-none text-stone-800 leading-relaxed font-sans mb-8">
              {renderFormattedContent(post.content)}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-[#EBE3D7]">
                <span className="text-xs font-bold text-stone-500 mr-2 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#8b1828]" /> Topics:
                </span>
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-[#faf7f2] text-stone-700 text-xs px-3.5 py-1.5 rounded-full border border-stone-200/90 font-medium hover:border-[#8b1828]/30 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Inline Trial Appointment Card */}
            <div className="mt-10 bg-gradient-to-br from-[#8b1828] via-[#801423] to-[#630f1b] rounded-3xl p-7 sm:p-9 text-white shadow-lg space-y-4">
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold leading-tight">
                Want to Try This Bridal or Groom Look?
              </h3>
              <p className="text-xs sm:text-sm text-rose-100 leading-relaxed max-w-xl">
                Connect directly with our master stylists. Reserve custom-altered designer wear for your Anand Karaj, Wedding Day, or Sangeet.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Ghar Shagna Da, I was reading "${post.title}" and would like to inquire about booking/trying this look.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3 rounded-full text-xs font-bold shadow-md transition-transform hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect on WhatsApp</span>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 hover:bg-stone-100 px-6 py-3 rounded-full text-xs font-bold transition-all shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-[#8b1828]" />
                  <span>Book Trial Visit</span>
                </Link>
              </div>
            </div>
          </article>

          {/* RIGHT: RICH LUXURY STICKY & SCROLLABLE SIDEBAR (4 COLS) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] custom-sidebar-scroll pr-1.5 pb-8 overscroll-contain">
            {/* 1. Quick WhatsApp Stylist Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBE3D7] shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8b1828] to-[#600f1a] text-white flex items-center justify-center font-bold text-base shadow-md">
                  GS
                </div>
                <div>
                  <h4 className="font-serif-luxury font-bold text-stone-900 text-base">
                    Ghar Shagna Da
                  </h4>
                  <p className="text-xs text-stone-500">Bridal & Groom Rental Studio</p>
                </div>
              </div>

              <div className="space-y-2.5 mb-5 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Complimentary Master Tailoring & Alteration</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Hospital-Grade Sanitized Garments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Standard 3-4 Days Rental Packages</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Ghar Shagna Da team, I have an outfit rental query.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 px-4 rounded-2xl text-xs font-bold transition-all shadow-sm hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Bridal Stylist</span>
              </a>
            </div>

            {/* 2. Trending Wedding Articles */}
            {recentPosts.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-[#EBE3D7] shadow-xs">
                <h4 className="font-serif-luxury font-bold text-stone-900 text-base mb-4 pb-2 border-b border-stone-100 flex items-center justify-between">
                  <span>Trending Guides</span>
                  <span className="text-[11px] text-[#8b1828] font-sans font-bold">Must Read</span>
                </h4>

                <div className="space-y-4">
                  {recentPosts.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="group flex gap-3.5 items-center hover:bg-stone-50 p-2 -mx-2 rounded-xl transition-colors"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200">
                        <Image
                          src={r.coverImage}
                          alt={r.title}
                          fill
                          sizes="64px"
                          className="object-cover object-top group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-[#8b1828] uppercase tracking-wider block mb-0.5">
                          {r.category}
                        </span>
                        <h5 className="font-serif-luxury text-xs font-bold text-stone-900 group-hover:text-[#8b1828] transition-colors line-clamp-2 leading-snug">
                          {r.title}
                        </h5>
                        <span className="text-[10px] text-stone-400 mt-1 block">
                          {r.readTime}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Explore Collections Quick Links */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBE3D7] shadow-xs">
              <h4 className="font-serif-luxury font-bold text-stone-900 text-base mb-3 pb-2 border-b border-stone-100">
                Explore Rentals
              </h4>
              <ul className="space-y-2 text-xs font-medium">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="flex items-center justify-between p-2 rounded-xl text-stone-700 hover:text-[#8b1828] hover:bg-rose-50/50 transition-colors group"
                    >
                      <span>{cat.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#8b1828] group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/catalog"
                    className="flex items-center justify-between p-2 rounded-xl text-[#8b1828] font-bold hover:bg-rose-50/80 transition-colors"
                  >
                    <span>Browse All Outfits</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#8b1828]" />
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
