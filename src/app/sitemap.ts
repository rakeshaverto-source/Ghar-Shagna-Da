import { MetadataRoute } from 'next';
import { CATEGORIES, SITE_CONFIG, INITIAL_PRODUCTS } from '@/data/products';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.domain;

  // 1. Static Core Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/men`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/women`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-rental-works`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // 2. Category Pages (Unique canonical routes)
  const uniqueCategorySlugs = Array.from(new Set(CATEGORIES.map((cat) => cat.slug.split('?')[0])));
  const categoryRoutes: MetadataRoute.Sitemap = uniqueCategorySlugs.map((slug) => ({
    url: `${baseUrl}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.85,
  }));

  // 3. Dynamic Products from MongoDB Database (with fallback)
  let productsList: { slug: string; updatedAt?: Date }[] = [];

  try {
    const conn = await connectDB();
    if (conn) {
      const dbProducts = await Product.find({}, 'slug updatedAt').lean();
      if (dbProducts && dbProducts.length > 0) {
        productsList = dbProducts.map((p) => ({
          slug: p.slug,
          updatedAt: p.updatedAt ? new Date(p.updatedAt) : new Date(),
        }));
      }
    }
  } catch (err) {
    console.error('Error fetching dynamic products for sitemap:', err);
  }

  // Fallback to initial products if database is empty or unavailable
  if (productsList.length === 0) {
    productsList = INITIAL_PRODUCTS.map((p) => ({
      slug: p.slug,
      updatedAt: new Date(),
    }));
  }

  const productRoutes: MetadataRoute.Sitemap = productsList.map((prod) => ({
    url: `${baseUrl}/product/${prod.slug}`,
    lastModified: prod.updatedAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 4. Dynamic Blog Posts
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const conn = await connectDB();
    const BlogPost = (await import('@/models/BlogPost')).default;
    const posts = conn ? await BlogPost.find({ isPublished: true }, 'slug updatedAt').lean() : [];
    if (posts && posts.length > 0) {
      blogRoutes = posts.map((b: any) => ({
        url: `${baseUrl}/blog/${b.slug}`,
        lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.75,
      }));
    }
  } catch (e) {
    // silently fallback
  }

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes];
}
