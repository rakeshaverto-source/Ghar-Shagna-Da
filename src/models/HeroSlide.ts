import mongoose, { Schema, Document } from 'mongoose';

export interface IHeroSlide extends Document {
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
  isVisible: boolean;
}

const HeroSlideSchema = new Schema<IHeroSlide>(
  {
    slideId: { type: String, required: true, unique: true },
    desktopImage: { type: String, required: true },
    mobileImage: { type: String, required: true },
    subtitle: { type: String, default: 'CRAFTED TO CELEBRATE' },
    headingPrefix: { type: String, default: 'SHAGNA DI' },
    headingHighlight: { type: String, default: 'Raat' },
    tagline: { type: String, default: 'TIMELESS DESIGNS. SHAHI ANDAAZ.' },
    subtagline: { type: String, default: 'Bridal Lehengas and Groom Sherwanis on Rent' },
    ctaText: { type: String, default: 'Explore Rentals' },
    ctaLink: { type: String, default: '/catalog' },
    theme: { type: String, enum: ['warm', 'dark'], default: 'warm' },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.HeroSlide || mongoose.model<IHeroSlide>('HeroSlide', HeroSlideSchema);
