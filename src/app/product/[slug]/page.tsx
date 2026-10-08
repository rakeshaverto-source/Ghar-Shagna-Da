import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { INITIAL_PRODUCTS } from '@/data/products';
import ProductDetailClient from '@/components/catalog/ProductDetailClient';
import { ProductJsonLd } from '@/components/seo/JsonLd';
import { constructMetadata } from '@/lib/seo';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return INITIAL_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = INITIAL_PRODUCTS.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    return constructMetadata({ title: 'Product Not Found' });
  }

  return constructMetadata({
    title: `${product.title} on Rent (${product.rentalPrice})`,
    description: product.metaDescription,
    image: product.images[0],
    canonical: `https://gharshagnada.com/product/${product.slug}`,
    keywords: [
      `${product.title} rent`,
      `${product.categoryLabel} on rent`,
      'Ghar Shagna Da rentals'
    ],
  });
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = INITIAL_PRODUCTS.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = INITIAL_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <>
      <ProductJsonLd product={product as any} />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
