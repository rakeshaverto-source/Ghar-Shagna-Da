import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryItem extends Document {
  title: string;
  altText?: string;
  category: string; // 'Bridal Lehengas', 'Groom Sherwanis', 'Wedding Gowns', 'Real Brides', etc.
  imageUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  productSlug?: string;
  brideName?: string;
  location?: string;
  isFeatured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    title: { type: String, required: true },
    altText: { type: String, default: '' },
    category: { type: String, default: 'Bridal Lehengas' },
    imageUrl: { type: String, required: true },
    thumbnailUrl: { type: String, default: '' },
    caption: { type: String, default: '' },
    productSlug: { type: String, default: '' },
    brideName: { type: String, default: '' },
    location: { type: String, default: 'Punjab' },
    isFeatured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.GalleryItem ||
  mongoose.model<IGalleryItem>('GalleryItem', GalleryItemSchema);
