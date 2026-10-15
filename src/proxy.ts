import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { CATEGORIES, INITIAL_PRODUCTS } from '@/data/products';
import { INITIAL_BLOG_POSTS } from '@/data/blogs';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import BlogPost from '@/models/BlogPost';

// Returns a real HTTP 404 for unknown product/blog/category slugs.
// Streamed pages always answer 200, which Google reports as "soft 404".
// Every check fails open (lets the request through) if anything goes wrong.

const CATEGORY_SLUGS = new Set(CATEGORIES.map((c) => c.slug.split('?')[0]));
const SEED_PRODUCTS = new Set(INITIAL_PRODUCTS.map((p) => p.slug));
const SEED_BLOGS = new Set(INITIAL_BLOG_POSTS.map((b) => b.slug));

const CACHE_MS = 60_000;
const cache = new Map<string, { exists: boolean; at: number }>();

async function existsInDb(kind: 'product' | 'blog', slug: string): Promise<boolean> {
  const key = `${kind}:${slug}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.exists;

  const conn = await connectDB();
  if (!conn) throw new Error('no db');
  const found =
    kind === 'product'
      ? await Product.exists({ slug })
      : await BlogPost.exists({ slug, isPublished: true });
  const exists = Boolean(found);
  cache.set(key, { exists, at: Date.now() });
  return exists;
}

export async function proxy(request: NextRequest) {
  const [, section, rawSlug] = request.nextUrl.pathname.split('/');
  if (!rawSlug) return NextResponse.next();
  const slug = decodeURIComponent(rawSlug);

  let known = true;
  try {
    if (section === 'category') {
      known = CATEGORY_SLUGS.has(slug);
    } else if (section === 'product') {
      known = SEED_PRODUCTS.has(slug) || (await existsInDb('product', slug));
    } else if (section === 'blog') {
      known = SEED_BLOGS.has(slug) || (await existsInDb('blog', slug));
    }
  } catch {
    return NextResponse.next();
  }

  if (known) return NextResponse.next();
  return NextResponse.rewrite(new URL('/__not-found__', request.url), { status: 404 });
}

export const config = {
  matcher: ['/category/:slug', '/product/:slug', '/blog/:slug'],
};
