import mongoose, { Schema, Document } from 'mongoose';

export interface IPageSeoItem {
  pagePath: string; // e.g. '/', '/catalog', '/contact', '/how-rental-works'
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}

export interface ISiteSettings extends Document {
  key: string;
  isHeroEnabled: boolean;
  heroMediaMode: 'video' | 'image';
  videoUrl?: string;
  videoHeadingPrefix?: string;
  videoHeadingHighlight?: string;
  videoTagline?: string;
  videoSubtagline?: string;
  videoCtaText?: string;
  videoCtaLink?: string;
  googleSearchConsoleToken?: string;
  googleAnalyticsId?: string;
  metaPixelId?: string;
  customSchemaJson?: string;
  pageSeoList?: IPageSeoItem[];
  updatedAt?: Date;
}

const PageSeoSchema = new Schema<IPageSeoItem>(
  {
    pagePath: { type: String, required: true },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    keywords: { type: String, default: '' },
    ogImage: { type: String, default: '' },
    canonical: { type: String, default: '' },
    noIndex: { type: Boolean, default: false },
  },
  { _id: false }
);

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    key: { type: String, required: true, unique: true, default: 'global' },
    isHeroEnabled: { type: Boolean, default: true },
    heroMediaMode: { type: String, enum: ['video', 'image'], default: 'video' },
    videoUrl: { type: String, default: '/luxury_lehengas.mp4' },
    videoHeadingPrefix: { type: String, default: 'SHAGNA DI' },
    videoHeadingHighlight: { type: String, default: 'Raat' },
    videoTagline: { type: String, default: 'TIMELESS DESIGNS. SHAHI ANDAAZ.' },
    videoSubtagline: { type: String, default: 'Khaas lamhon ke liye, sabse khoobsurat bridal lehengas on rent.' },
    videoCtaText: { type: String, default: 'Explore Bridal Rentals' },
    videoCtaLink: { type: String, default: '/category/bridal-lehengas' },
    googleSearchConsoleToken: { type: String, default: '' },
    googleAnalyticsId: { type: String, default: '' },
    metaPixelId: { type: String, default: '' },
    customSchemaJson: { type: String, default: '' },
    pageSeoList: { type: [PageSeoSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
