import React from 'react';
import { Metadata } from 'next';
import { INITIAL_BLOG_POSTS, BlogPostItem } from '@/data/blogs';
import BlogPost from '@/models/BlogPost';
import { connectDB } from '@/lib/mongodb';
import BlogClientView from '@/components/ui/BlogClientView';
import { SITE_CONFIG } from '@/data/products';
import { constructMetadata, OG_IMAGES } from '@/lib/seo';

import { connection } from 'next/server';

export const instant = false;

export const metadata: Metadata = constructMetadata({
  title: 'Wedding Wear & Bridal Rental Guides | Ghar Shagna Da Blog',
  description:
    'Explore expert bridal styling tips, wedding lehenga rental guides, groom sherwani trends, and NRI bridal advice curated by Ghar Shagna Da.',
  keywords: [
    'bridal lehenga on rent blog',
    'bridal styling tips chandigarh',
    'wedding dress rental guide',
    'groom sherwani ideas',
    'ghar shagna da blog',
  ],
  canonical: `${SITE_CONFIG.domain}/blog`,
  image: OG_IMAGES.blog,
});

async function getBlogPosts(): Promise<BlogPostItem[]> {
  try {
    try {
      await connection();
    } catch {
      // In static prerender, connection() rejects by design; fallback gracefully
    }
    const conn = await connectDB();
    if (!conn) {
      return INITIAL_BLOG_POSTS;
    }
    const posts = await BlogPost.find({ isPublished: true }).sort({ publishedAt: -1, createdAt: -1 });
    if (!posts || posts.length === 0) {
      return INITIAL_BLOG_POSTS;
    }
    return JSON.parse(JSON.stringify(posts));
  } catch (err) {
    console.error('Failed to query blog posts:', err);
    return INITIAL_BLOG_POSTS;
  }
}

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 sm:pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogClientView posts={posts} />
      </div>
    </div>
  );
}
