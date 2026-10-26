'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPostItem } from '@/data/blogs';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';

interface HomeBlogSectionProps {
  initialPosts?: BlogPostItem[];
}

export default function HomeBlogSection({ initialPosts }: HomeBlogSectionProps) {
  const [blogs, setBlogs] = useState<BlogPostItem[]>(initialPosts || []);
  const [loading, setLoading] = useState(!initialPosts);

  useEffect(() => {
    if (initialPosts) return;
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        if (data.posts && data.posts.length > 0) {
          setBlogs(data.posts.slice(0, 8));
        }
      })
      .catch((err) => console.error('Failed to load blog section', err))
      .finally(() => setLoading(false));
  }, [initialPosts]);

  if (!loading && blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F5] border-t border-[#f0eae1] !mt-0">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8b1828] uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Bridal Stories & Rental Advice</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Shagna Di Baatan: <span className="text-[#8b1828] italic font-serif">Wedding Insights</span>
            </h2>
            <p className="mt-2 text-stone-600 text-sm max-w-xl">
              From handpicking your dream wedding lehenga to groom sherwani styling tips, explore expert advice from Punjab&apos;s luxury wedding curators.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#8b1828] hover:text-[#70121f] group transition-colors self-start md:self-end"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Blog Cards Grid: Responsive 1 col (mobile), 2 cols (tablet), up to 4 cols (desktop) for 8 blogs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <article
              key={blog.id || blog.slug}
              className="bg-white rounded-3xl overflow-hidden border border-[#EBE3D7] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
            >
              <Link href={`/blog/${blog.slug}`} className="relative aspect-video overflow-hidden block bg-stone-100">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-contain object-center group-hover:scale-105 transition-transform duration-700"
                />
              </Link>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-2.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {blog.readTime || '4 min read'}
                    </span>
                    <span>•</span>
                    <span className="truncate max-w-[140px]">By {blog.author || 'Ghar Shagna Da'}</span>
                  </div>

                  <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-stone-900 group-hover:text-[#8b1828] transition-colors leading-snug line-clamp-2 mb-2.5 min-h-[44px]">
                    <Link href={`/blog/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed mb-4 font-sans">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-400">
                    Rental Checklist
                  </span>
                  <Link
                    href={`/blog/${blog.slug}`}
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
      </div>
    </section>
  );
}
