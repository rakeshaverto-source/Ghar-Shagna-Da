import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { connection } from 'next/server';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { CATEGORIES, INITIAL_PRODUCTS, SITE_CONFIG, Product } from '@/data/products';
import ProductCard from '@/components/catalog/ProductCard';
import { constructMetadata } from '@/lib/seo';
import { getAdminPageSeo } from '@/lib/pageSeo';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { connectDB } from '@/lib/mongodb';
import ProductModel from '@/models/Product';
import { CLEAN_CATEGORY_ROUTES, resolveCategoryRoute } from '@/lib/categoryRoutes';

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
    ...Object.keys(CLEAN_CATEGORY_ROUTES).map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params, searchParams }: CategoryPageProps): Promise<Metadata> {
  const { slug, filter, pagePath } = resolveCategoryRoute(
    (await params).slug,
    searchParams ? await searchParams : {}
  );
  const { occasion } = filter;
  const { category } = findCategory(slug, filter);

  if (!category) {
    return constructMetadata({ title: 'Category Not Found | Ghar Shagna Da', noIndex: true });
  }

  // Each occasion/type page gets its own SEO, matching the paths listed in the admin "Page SEO" tab
  const adminSeo = await getAdminPageSeo(pagePath);

  const isMen = MEN_CATEGORY_SLUGS.includes(slug);
  const occasionLabel = occasion ? occasion.charAt(0).toUpperCase() + occasion.slice(1) : '';
  const defaultTitle = occasion
    ? `${occasionLabel} Outfits on Rent for ${isMen ? 'Grooms' : 'Brides'} | Ghar Shagna Da`
    : `${category.title} on Rent | Ghar Shagna Da`;
  const defaultDescription = occasion
    ? `Rent handcrafted ${isMen ? 'sherwanis and groom wear' : 'lehengas, gowns and bridal outfits'} for ${occasionLabel} in Punjab. Custom fitting, hygienic sanitization and affordable rentals.`
    : `Rent handcrafted ${category.title} for weddings and Anand Karaj in Punjab. Custom fitting, hygienic sanitization and affordable rentals.`;
  const defaultKeywords = occasion
    ? [
        `${occasionLabel.toLowerCase()} outfit on rent`,
        `${occasionLabel.toLowerCase()} ${isMen ? 'sherwani' : 'lehenga'} on rent`,
        'Ghar Shagna Da rentals',
      ]
    : [`${category.title} on rent`, `wedding ${category.title} rental`, 'Ghar Shagna Da rentals'];

  return constructMetadata({
    title: adminSeo?.title?.trim() || defaultTitle,
    description: adminSeo?.description?.trim() || defaultDescription,
    canonical: adminSeo?.canonical?.trim() || `${SITE_CONFIG.domain}${pagePath}`,
    image: adminSeo?.ogImage?.trim() || encodeURI(category.image),
    noIndex: Boolean(adminSeo?.noIndex),
    keywords: adminSeo?.keywords?.trim()
      ? adminSeo.keywords.split(',').map((k) => k.trim()).filter(Boolean)
      : defaultKeywords,
  });
}

// Men's collection; every other category belongs to the women's section
const MEN_CATEGORY_SLUGS = ['sherwanis'];

// Spelling variants used for the same event (e.g. "Mehndi" on a product, "mehendi" in the URL)
const OCCASION_ALIASES: Record<string, string> = {
  mehendi: 'mehe?ndi',
  mehndi: 'mehe?ndi',
  sangeet: 'sangeet|sangit',
};

function occasionPattern(occasion: string) {
  const key = occasion.toLowerCase();
  return OCCASION_ALIASES[key] || key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function typePattern(type: string) {
  // "indo-western" should also match "Indo Western"
  return type.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/-/g, '[- ]');
}

// Page entry (e.g. "wedding-dresses?occasion=cocktail") for the banner, plus the base collection for breadcrumbs
function findCategory(slug: string, filter: { occasion?: string; type?: string }) {
  const page =
    (filter.occasion && CATEGORIES.find((c) => c.slug === `${slug}?occasion=${filter.occasion}`)) ||
    (filter.type && CATEGORIES.find((c) => c.slug === `${slug}?type=${filter.type}`)) ||
    undefined;
  const base =
    CATEGORIES.find((c) => c.slug === slug) ||
    CATEGORIES.find((c) => c.slug.split('?')[0] === slug);
  return { category: page || base, baseCategory: base };
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
      const isMen = MEN_CATEGORY_SLUGS.includes(categorySlug);
      const query: any = filter?.occasion
        ? // Occasion pages list every outfit for that event in the men's or women's section
          { categorySlug: isMen ? { $in: MEN_CATEGORY_SLUGS } : { $nin: MEN_CATEGORY_SLUGS } }
        : {
            $or: [
              { categorySlug: categorySlug },
              { category: categorySlug },
            ],
          };

      if (filter?.occasion) {
        query.occasion = { $regex: new RegExp(occasionPattern(filter.occasion), 'i') };
      }

      if (filter?.type) {
        const typeRegex = new RegExp(typePattern(filter.type), 'i');
        query.$and = [
          {
            $or: [
              { category: { $regex: typeRegex } },
              { title: { $regex: typeRegex } },
              { subtitle: { $regex: typeRegex } },
              { description: { $regex: typeRegex } },
            ],
          },
        ];
      }

      const dbProducts = await ProductModel.find(query).sort({ createdAt: -1 }).lean();

      // Once the DB is connected it is the source of truth; an empty result must not fall back
      // to the static sample outfits (they ignore admin edits to category/occasion)
      if (dbProducts) {
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
          reviews: (p.reviews || []).filter((r: any) => r.approved !== false).map((r: any) => ({
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

  const isMen = MEN_CATEGORY_SLUGS.includes(categorySlug);
  let staticList = filter?.occasion
    ? INITIAL_PRODUCTS.filter((p) => MEN_CATEGORY_SLUGS.includes(p.category) === isMen)
    : INITIAL_PRODUCTS.filter((p) => p.category === categorySlug);
  if (filter?.occasion) {
    const occRegex = new RegExp(occasionPattern(filter.occasion), 'i');
    staticList = staticList.filter((p) => occRegex.test(p.occasion));
  }
  if (filter?.type) {
    const typeRegex = new RegExp(typePattern(filter.type), 'i');
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
  const { slug, filter, pagePath, redirectTo } = resolveCategoryRoute(
    (await params).slug,
    searchParams ? await searchParams : {}
  );
  // Old query-string URLs (e.g. /category/sherwanis?type=kurta) move to their clean URL
  if (redirectTo) {
    permanentRedirect(redirectTo);
  }
  const { category, baseCategory } = findCategory(slug, filter);

  if (!category || !baseCategory) {
    notFound();
  }

  const activeOccasion = filter.occasion;
  const activeType = filter.type;

  const categoryProducts = await getCategoryProducts(slug, {
    occasion: activeOccasion,
    type: activeType,
  });

  // Dynamic filter title badge
  const filterLabel = activeOccasion
    ? `${activeOccasion.charAt(0).toUpperCase() + activeOccasion.slice(1)} Special`
    : activeType
    ? `${category.title} Collection`
    : null;

  // Occasion pages cover the whole men's or women's section, not a single collection
  const isMen = MEN_CATEGORY_SLUGS.includes(slug);
  const parentCrumb = activeOccasion
    ? { title: isMen ? "Men" : "Women", href: isMen ? "/men" : "/women" }
    : { title: baseCategory.title, href: `/category/${slug}` };
  const pageTitle = activeOccasion
    ? `${filterLabel} • ${isMen ? "Groom Outfits" : "Bridal & Party Outfits"}`
    : category.title;

  // Home / Men or Women / this page, e.g. "Home / Men / Indo Western"
  const sectionCrumb = { name: isMen ? 'Men' : 'Women', href: isMen ? '/men' : '/women' };
  const currentCrumbName = activeOccasion
    ? `${activeOccasion.charAt(0).toUpperCase() + activeOccasion.slice(1)} Outfits`
    : category.title;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_CONFIG.domain },
          { name: sectionCrumb.name, url: `${SITE_CONFIG.domain}${sectionCrumb.href}` },
          { name: currentCrumbName, url: `${SITE_CONFIG.domain}${pagePath}` },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-12 space-y-12">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" className="hover:text-[#8b1828]">
          Home
        </Link>
        <span>/</span>
        <Link href={sectionCrumb.href} className="hover:text-[#8b1828]">
          {sectionCrumb.name}
        </Link>
        <span>/</span>
        <span aria-current="page" className="text-[#8b1828] font-semibold">
          {currentCrumbName}
        </span>
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
            {pageTitle} on Rent
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
                href={parentCrumb.href}
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
                href={parentCrumb.href}
                className="px-5 py-2.5 rounded-full bg-[#8b1828] text-white text-xs font-semibold hover:bg-[#70121f] transition-colors"
              >
                View All {parentCrumb.title}
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
