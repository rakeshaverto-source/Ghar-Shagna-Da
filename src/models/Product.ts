import mongoose, { Schema, Document } from 'mongoose';

export interface IProductReview {
  author: string;
  city?: string;
  date?: string;
  rating: number;
  comment: string;
  image?: string;
  tag?: string;
}

export interface IProduct extends Document {
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
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  reviews?: IProductReview[];
  status: 'available' | 'rented' | 'reserved' | 'maintenance';
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    category: { type: String, required: true },
    categorySlug: { type: String, required: true },
    price: { type: String, required: true },
    originalValue: { type: String, required: true },
    deposit: { type: String, required: true },
    duration: { type: String, default: '3 Days' },
    images: { type: [String], default: [] },
    description: { type: String, required: true },
    fabric: { type: String, required: true },
    work: { type: String, required: true },
    color: { type: String, required: true },
    occasion: { type: String, required: true },
    sizes: { type: [String], default: ['Custom Fit Available'] },
    includes: { type: [String], default: [] },
    rating: { type: Number, default: 5 },
    reviewsCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    reviews: {
      type: [
        {
          author: { type: String, required: true },
          city: { type: String, default: '' },
          date: { type: String, default: '' },
          rating: { type: Number, default: 5 },
          comment: { type: String, required: true },
          image: { type: String, default: '' },
          tag: { type: String, default: 'Verified Bride' },
        },
      ],
      default: [],
    },
    status: {
      type: String,
      enum: ['available', 'rented', 'reserved', 'maintenance'],
      default: 'available',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
