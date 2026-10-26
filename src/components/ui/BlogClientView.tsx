'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPostItem } from '@/data/blogs';
import { Clock, ArrowRight, BookOpen, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/data/products';
import BlogNotifyButton from '@/components/blog/BlogNotifyButton';

interface BlogClientViewProps {
  posts: BlogPostItem[];
}

export default function BlogClientView({ posts }: BlogClientViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['all', ...Array.from(new Set(posts.map((p) => p.category))).filter(Boolean)];


  const filteredPosts = posts.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      (p.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* CLEAN MINIMAL HEADER (Like Catalog & Gallery) */}
      <div className="text-center space-y-3">
        <span className="font-script text-3xl sm:text-4xl text-[#8b1828]">Wedding Stories & Advice</span>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-stone-900">
          Bridal Styling Guides & Blog
        </h1>
        <p className="text-sm text-stone-600 max-w-xl mx-auto">
          Expert styling advice, rental checklists, and bridal trends to ensure you look effortlessly royal on your wedding day.
        </p>
        <div className="pt-2 flex justify-center">
          <BlogNotifyButton />
        </div>
      </div>

      {/* 2. CATEGORY PILLS BAR */}
      <section className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EBE3D7] pb-6">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-[#8b1828] text-white shadow-md shadow-[#8b1828]/20'
                  : 'bg-white text-stone-700 border border-[#EBE3D7] hover:bg-stone-50'
              }`}
            >
              {cat === 'all' ? 'All Stories' : cat}
            </button>
          ))}
        </div>

        <span className="text-xs text-stone-500 font-semibold">
          Showing {filteredPosts.length} Guides
        </span>
      </section>

      {/* 3. CLEAN UNIFORM ARTICLES GRID (No huge horizontal card) */}
      <section className="space-y-8">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id || post.slug}
                className="bg-white rounded-3xl overflow-hidden border border-[#EBE3D7] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
              >
                <Link href={`/blog/${post.slug}`} className="relative aspect-video overflow-hidden block bg-stone-100">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </Link>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-2">
                      <Clock className="w-3 h-3 text-[#8b1828]" />
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
                    </div>

                    <h3 className="font-serif-luxury text-lg font-bold text-stone-900 group-hover:text-[#8b1828] transition-colors leading-snug line-clamp-2 mb-2.5">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed font-sans">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-stone-400">
                      By {post.author.split(' ')[0]}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8b1828] group-hover:translate-x-1 transition-transform"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8">
            <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="font-serif-luxury text-lg font-bold text-stone-800">
              No matching stories found
            </h3>
            <p className="text-xs text-stone-500 mt-1 mb-5">
              Try searching with another keyword or explore all articles.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="bg-[#8b1828] text-white px-5 py-2.5 rounded-full text-xs font-bold"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* 5. EXPERT CONSULTATION PROMPT BANNER */}
      <section className="bg-gradient-to-r from-[#8b1828] to-[#a31f31] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="font-script text-3xl text-amber-200 block">
            Personal Bridal Stylist
          </span>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold">
            Plan Your Dream Wedding Ensemble with Us
          </h3>
          <p className="text-xs sm:text-sm text-rose-100 max-w-lg">
            Have questions about wedding dress color pairing, Anand Karaj trials, or NRI remote bookings? Our experts are ready to assist.
          </p>
        </div>

        <a
          href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
            'Hello Ghar Shagna Da team, I was browsing your wedding blog and would like personal styling consultation.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 px-8 rounded-full text-xs sm:text-sm shadow-md transition-all hover:scale-105 shrink-0"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Chat on WhatsApp</span>
        </a>
      </section>
    </div>
  );
}
