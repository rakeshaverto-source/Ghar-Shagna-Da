import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonialReview extends Document {
  author: string;
  city?: string;
  date?: string;
  rating: number;
  comment: string;
  image?: string;
  tag?: string;
  productTitle?: string;
  isFeatured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialReviewSchema = new Schema<ITestimonialReview>(
  {
    author: { type: String, required: true },
    city: { type: String, default: 'Punjab' },
    date: { type: String, default: '' },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    comment: { type: String, required: true },
    image: { type: String, default: '' },
    tag: { type: String, default: 'Verified Bride' },
    productTitle: { type: String, default: '' },
    isFeatured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.TestimonialReview ||
  mongoose.model<ITestimonialReview>('TestimonialReview', TestimonialReviewSchema);
