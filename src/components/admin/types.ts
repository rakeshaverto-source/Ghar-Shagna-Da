export interface HeroSlideItem {
  _id?: string;
  slideId: string;
  desktopImage: string;
  mobileImage: string;
  subtitle: string;
  headingPrefix: string;
  headingHighlight: string;
  tagline: string;
  subtagline: string;
  ctaText: string;
  ctaLink: string;
  theme: 'warm' | 'dark';
  order: number;
  isVisible?: boolean;
}

export interface ProductReviewItem {
  author: string;
  city?: string;
  date?: string;
  rating: number;
  comment: string;
  image?: string;
  tag?: string;
}

export interface HomeReviewItem {
  _id?: string;
  author: string;
  city?: string;
  date?: string;
  rating: number;
  comment: string;
  image?: string;
  tag?: string;
  productTitle?: string;
  isFeatured?: boolean;
  order?: number;
}

export interface OutfitItem {
  _id?: string;
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  categorySlug: string;
  price: string;
  originalValue: string;
  deposit: string;
  duration: string;
  images: string[];
  description: string;
  fabric: string;
  work: string;
  color: string;
  occasion: string;
  sizes: string[];
  includes: string[];
  reviews?: ProductReviewItem[];
  featured?: boolean;
  status: 'available' | 'rented' | 'reserved' | 'maintenance';
}

export interface BookingLead {
  _id: string;
  productTitle: string;
  customerName: string;
  phone: string;
  eventDate: string;
  rentalDuration: string;
  city: string;
  notes?: string;
  status: 'new' | 'contacted' | 'booked' | 'returned' | 'cancelled';
  createdAt: string;
}

export const CATEGORY_OPTIONS = [
  { label: 'Bridal Lehengas', slug: 'bridal-lehengas' },
  { label: 'Wedding Gowns', slug: 'wedding-dresses' },
  { label: 'Festive Shararas', slug: 'festive-shararas' },
  { label: 'Groom Sherwanis', slug: 'sherwanis' },
  { label: 'Designer Sarees', slug: 'designer-sarees' },
  { label: 'Royal Anarkalis', slug: 'anarkali-suits' },
];

export const OCCASION_OPTIONS = [
  { label: 'Cocktail', value: 'Cocktail' },
  { label: 'Reception', value: 'Reception' },
  { label: 'Sangeet', value: 'Sangeet' },
  { label: 'Bridesmaid', value: 'Bridesmaid' },
  { label: 'Mehendi', value: 'Mehendi' },
  { label: 'Haldi', value: 'Haldi' },
  { label: 'Wedding Day / Phere', value: 'Wedding Day' },
  { label: 'Engagement / Ring Ceremony', value: 'Engagement' },
];

export interface VideoSettings {
  videoUrl: string;
  videoHeadingPrefix: string;
  videoHeadingHighlight: string;
  videoTagline: string;
  videoSubtagline: string;
  videoCtaText: string;
  videoCtaLink: string;
}

export interface PageSeoItem {
  pagePath: string;
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}

export interface AnalyticsSettings {
  googleSearchConsoleToken: string;
  googleAnalyticsId: string;
  metaPixelId: string;
  customSchemaJson?: string;
  pageSeoList?: PageSeoItem[];
}

export interface GalleryItemType {
  _id?: string;
  title: string;
  altText?: string;
  category: string;
  imageUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  productSlug?: string;
  brideName?: string;
  location?: string;
  isFeatured?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}
