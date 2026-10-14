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
  searchParams?: Promise<{
    occasion?: string;
    type?: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { slug: 'bridal-lehengas' },
    { slug: 'wedding-dresses' },
    { slug: 'sherwanis' },
  ];
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category =
    CATEGORIES.find((c) => c.slug.split('?')[0] === resolvedParams.slug) ||
    CATEGORIES.find((c) => c.slug === resolvedParams.slug);

  if (!category) {
    return constructMetadata({ title: 'Category Not Found' });
  }

  return constructMetadata({
    title: `${category.title} on Rent | Ghar Shagna Da`,
    description: `Rent handcrafted ${category.title} for weddings and Anand Karaj in Punjab. Custom fitting, hygienic sanitization and affordable rentals.`,
    canonical: `https://gharshagnada.com/category/${resolvedParams.slug}`,
    keywords: [
      `${category.title} on rent`,
      `wedding ${category.title} rental`,
      `Ghar Shagna Da rentals`,
    ],
  });
}

async function getCategoryProducts(
  categorySlug: string,
  filter?: { occasion?: string; type?: string }
): Promise<Product[]> {
  try {
    try {
      await connection();
    } catch {
      // In static prerender, connection() rejects by design; fallback gracefully
    }
    const conn = await connectDB();
    if (conn) {
      const query: any = {
        $or: [
          { categorySlug: categorySlug },
          { category: categorySlug },
        ],
      };

      if (filter?.occasion) {
        query.occasion = { $regex: new RegExp(filter.occasion, 'i') };
      }

      if (filter?.type) {
        query.$and = [
          {
            $or: [
              { title: { $regex: new RegExp(filter.type, 'i') } },
              { subtitle: { $regex: new RegExp(filter.type, 'i') } },
              { description: { $regex: new RegExp(filter.type, 'i') } },
            ],
          },
        ];
      }

      const dbProducts = await ProductModel.find(query).sort({ createdAt: -1 }).lean();

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
          status: (p.status as any) || 'available',
          reviews: (p.reviews || []).map((r: any) => ({
            author: r.author || '',
            city: r.city || '',
            date: r.date || '',
            rating: Number(r.rating) || 5,
            comment: r.comment || '',
            image: r.image || '',
            tag: r.tag || '',
          })),
          metaDescription: p.description ? p.description.slice(0, 160) : '',
        }));
      }
    }
  } catch (err) {
    console.error('Error fetching category products from DB:', err);
  }

  let staticList = INITIAL_PRODUCTS.filter((p) => p.category === categorySlug);
  if (filter?.occasion) {
    const occRegex = new RegExp(filter.occasion, 'i');
    staticList = staticList.filter((p) => occRegex.test(p.occasion));
  }
  if (filter?.type) {
    const typeRegex = new RegExp(filter.type, 'i');
    staticList = staticList.filter(
      (p) =>
        typeRegex.test(p.title) ||
        typeRegex.test(p.subtitle || '') ||
        typeRegex.test(p.description || '')
    );
  }
  return staticList;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const category =
    CATEGORIES.find((c) => c.slug.split('?')[0] === resolvedParams.slug) ||
    CATEGORIES.find((c) => c.slug === resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const activeOccasion = resolvedSearchParams.occasion;
  const activeType = resolvedSearchParams.type;

  const categoryProducts = await getCategoryProducts(category.slug, {
    occasion: activeOccasion,
    type: activeType,
  });

  // Dynamic filter title badge
  const filterLabel = activeOccasion
    ? `${activeOccasion.charAt(0).toUpperCase() + activeOccasion.slice(1)} Special`
    : activeType
    ? `${activeType.charAt(0).toUpperCase() + activeType.slice(1)} Collection`
    : null;

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
        <Link href={`/category/${category.slug}`} className="hover:text-[#8b1828]">
          {category.title}
        </Link>
        {filterLabel && (
          <>
            <span>/</span>
            <span className="text-[#8b1828] font-semibold">{filterLabel}</span>
          </>
        )}
      </nav>

      {/* Category Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#f0eae1] bg-[#faf7f2] p-8 sm:p-12 shadow-sm">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200/60 px-3.5 py-1 rounded-full text-xs font-semibold text-[#8b1828] uppercase tracking-wider">
              {category.handwrittenSubtitle}
            </span>
            {filterLabel && (
              <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-300/70 px-3 py-1 rounded-full text-xs font-bold text-amber-900 tracking-wide">
                ✨ {filterLabel}
              </span>
            )}
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-stone-900">
            {filterLabel ? `${filterLabel} • ` : ''}{category.title} on Rent
          </h1>

          <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed">
            {filterLabel
              ? `Handpicked luxury ensembles specially curated for ${activeOccasion || activeType}. Preserved in pristine condition and altered to your measurements.`
              : `${category.tagline}. Every piece is carefully preserved, sanitized, and altered to your measurements by master artisans.`}
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
          <div className="flex items-center gap-3">
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900">
              {filterLabel ? `${filterLabel} Outfits` : 'Available Designs'}
            </h2>
            {filterLabel && (
              <Link
                href={`/category/${category.slug}`}
                className="text-xs text-[#8b1828] hover:underline font-medium"
              >
                Clear Filter (View All)
              </Link>
            )}
          </div>
          <span className="text-xs text-stone-500">
            Select an outfit to enquire or check dates
          </span>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200/80 p-8 space-y-4">
            <p className="font-cinzel text-lg font-bold text-stone-800">
              No specific outfits found matching this filter
            </p>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
              We have a vast collection of bridal and wedding outfits available at our showroom.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Link
                href={`/category/${category.slug}`}
                className="px-5 py-2.5 rounded-full bg-[#8b1828] text-white text-xs font-semibold hover:bg-[#70121f] transition-colors"
              >
                View All {category.title}
              </Link>
              <Link
                href="/catalog"
                className="px-5 py-2.5 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors"
              >
                Browse All Outfits
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
    </>
  );
}
