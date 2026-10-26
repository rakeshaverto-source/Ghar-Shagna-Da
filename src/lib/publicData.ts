import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import TestimonialReview from '@/models/TestimonialReview';
import BlogPost from '@/models/BlogPost';
import HeroSlide from '@/models/HeroSlide';
import SiteSettings from '@/models/SiteSettings';

// Server-side reads for public pages, so they render real data on first paint
// instead of showing the static sample data until a client-side fetch finishes.
// Each returns null when the DB is unavailable; callers then fall back to the static data.

// Converts mongoose docs (ObjectId, Date) into plain JSON, matching what the API routes return
function toPlain<T>(value: T): any {
  return JSON.parse(JSON.stringify(value));
}

export async function getPublicProducts(): Promise<any[] | null> {
  try {
    const conn = await connectDB();
    if (!conn) return null;

    const products = await Product.find().sort({ createdAt: -1 }).lean();
    // Pending customer reviews are only visible to the admin
    for (const p of products) {
      p.reviews = (p.reviews || []).filter((r: { approved?: boolean }) => r.approved !== false);
    }
    return toPlain(products);
  } catch (err) {
    console.error('Error fetching products from DB:', err);
    return null;
  }
}

export async function getPublicTestimonials(): Promise<any[] | null> {
  try {
    const conn = await connectDB();
    if (!conn) return null;

    const reviews = await TestimonialReview.find().sort({ order: 1, createdAt: -1 }).lean();
    return toPlain(reviews);
  } catch (err) {
    console.error('Error fetching testimonials from DB:', err);
    return null;
  }
}

export async function getPublicBlogPosts(): Promise<any[] | null> {
  try {
    const conn = await connectDB();
    if (!conn) return null;

    const posts = await BlogPost.find({ isPublished: true }).sort({ publishedAt: -1, createdAt: -1 }).lean();
    return toPlain(posts);
  } catch (err) {
    console.error('Error fetching blog posts from DB:', err);
    return null;
  }
}

export async function getPublicHero(): Promise<any | null> {
  try {
    const conn = await connectDB();
    if (!conn) return null;

    const [slides, settings] = await Promise.all([
      HeroSlide.find().sort({ order: 1 }).lean(),
      SiteSettings.findOne({ key: 'global' }).lean(),
    ]);
    const s: any = settings || {};

    return toPlain({
      slides,
      isHeroEnabled: s.isHeroEnabled !== false,
      heroMediaMode: s.heroMediaMode || (settings ? 'video' : 'image'),
      videoUrl: s.videoUrl || '/luxury_lehengas.mp4',
      videoHeadingPrefix: s.videoHeadingPrefix,
      videoHeadingHighlight: s.videoHeadingHighlight,
      videoTagline: s.videoTagline,
      videoSubtagline: s.videoSubtagline,
      videoCtaText: s.videoCtaText,
      videoCtaLink: s.videoCtaLink,
    });
  } catch (err) {
    console.error('Error fetching hero from DB:', err);
    return null;
  }
}
