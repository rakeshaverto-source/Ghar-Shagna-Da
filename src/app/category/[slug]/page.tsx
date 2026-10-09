import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { CATEGORIES, INITIAL_PRODUCTS, SITE_CONFIG, Product } from '@/data/products';
import ProductCard from '@/components/catalog/ProductCard';
import { constructMetadata } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { connectDB } from '@/lib/mongodb';
import ProductModel from '@/models/Product';

export const instant = false;

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = CATEGORIES.find((c) => c.slug === resolvedParams.slug);

  if (!category) {
    return constructMetadata({ title: 'Category Not Found' });
  }

  return constructMetadata({
    title: `${category.title} on Rent | Ghar Shagna Da`,
    description: `Rent handcrafted ${category.title} for weddings and Anand Karaj in Punjab. Custom fitting, hygienic sanitization and affordable rentals.`,
    canonical: `https://gharshagnada.com/category/${category.slug}`,
    keywords: [
      `${category.title} on rent`,
      `wedding ${category.title} rental`,
      `Ghar Shagna Da rentals`,
    ],
  });
}

async function getCategoryProducts(categorySlug: string): Promise<Product[]> {
  try {
    try {
      await connection();
    } catch {
      // In static prerender, connection() rejects by design; fallback gracefully
    }
    const conn = await connectDB();
    if (conn) {
      const dbProducts = await ProductModel.find({
        $or: [
          { categorySlug: categorySlug },
          { category: categorySlug },
        ],
      }).sort({ createdAt: -1 }).lean();

      if (dbProducts && dbProducts.length > 0) {
        return dbProducts.map((p) => ({
          _id: p._id ? p._id.toString() : undefined,
          id: p.id || p.slug,
          slug: p.slug,
          title: p.title,
          subtitle: p.subtitle || '',
          category: (p.categorySlug || p.category || categorySlug) as any,
          categoryLabel: p.category || categorySlug,
          rentalPrice: p.price,
          securityDeposit: p.deposit,
          originalPrice: p.originalValue,
          color: p.color || '',
          fabric: p.fabric || '',
          embroidery: p.work || '',
          occasion: p.occasion || '',
          description: p.description || '',
          includes: p.includes || [],
          images: p.images || [],
          sizes: p.sizes || ['Custom Fit Available'],
          rentalDays: p.duration || '3 Days',
          isTrending: p.featured || false,
          reviews: p.reviews || [],
          metaDescription: p.description ? p.description.slice(0, 160) : '',
        }));
      }
    }
  } catch (err) {
    console.error('Error fetching category products from DB:', err);
  }

  return INITIAL_PRODUCTS.filter((p) => p.category === categorySlug);
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const category = CATEGORIES.find((c) => c.slug === resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = await getCategoryProducts(category.slug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_CONFIG.domain },
          { name: 'Catalog', url: `${SITE_CONFIG.domain}/catalog` },
          { name: category.title, url: `${SITE_CONFIG.domain}/category/${category.slug}` },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-12 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" className="hover:text-[#8b1828]">
          Home
        </Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-[#8b1828]">
          Catalog
        </Link>
        <span>/</span>
        <span className="text-[#8b1828] font-semibold">{category.title}</span>
      </nav>

      {/* Category Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#f0eae1] bg-[#faf7f2] p-8 sm:p-12 shadow-sm">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200/60 px-3.5 py-1 rounded-full text-xs font-semibold text-[#8b1828]">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#8b1828]">{category.handwrittenSubtitle}</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-stone-900">
            {category.title} on Rent
          </h1>

          <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed">
            {category.tagline}. Every piece is carefully preserved, sanitized, and altered to your measurements by master artisans.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-stone-700 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#8b1828]" /> Custom Alterations Included
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#8b1828]" /> 3-4 Days Standard Booking
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#8b1828]" /> Direct WhatsApp Support
            </span>
          </div>
        </div>

        {/* Decorative subtle backdrop image */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-15 hidden md:block">
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Products Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900">
            Available Designs ({categoryProducts.length})
          </h2>
          <span className="text-xs text-stone-500">
            Select an outfit to enquire or check dates
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
    </>
  );
}
